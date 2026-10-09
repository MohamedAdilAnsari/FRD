'use client';

import React, { useEffect, useState, useRef } from 'react';
import { OfficialNutzDocument } from '@/components/OfficialNutzDocument';
import { Download, ArrowLeft, Loader2, FileText, CheckCircle2, Printer } from 'lucide-react';
import Link from 'next/link';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';

export default function ProjectPdfPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const printDocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.project) {
          setProject(data.project);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  // Direct 1-click automatic PDF file downloader (No browser print headers or footers)
  const handleDownloadPdf = async () => {
    const element = printDocRef.current || document.getElementById('printable-nutz-document');
    if (!element) return;

    try {
      setIsDownloading(true);
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const fileName = project?.pdfFileName || `${(project?.projectName || 'Project').replace(/\s+/g, '_')}_FRD.pdf`;
      const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

      const opt: any = {
        margin: [10, 10, 10, 10],
        filename: cleanFileName,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Direct PDF export error, falling back to clean print:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <GsapLoadingScreen message="Preparing Official Nutz FRD Document..." subtitle="Formatting high-resolution executive PDF layout..." />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <p className="text-xs text-red-600 font-semibold mb-2">Document not found or access restricted.</p>
        <p className="text-[11px] text-neutral-500 mb-4">You may need to sign in with an authorized client or administrator account.</p>
        <Link href="/projects" className="px-4 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const pdfOutputName = project.pdfFileName || `${project.projectName}_FRD.pdf`;

  return (
    <div className="min-h-screen bg-neutral-100/70 py-6 sm:py-8 px-2 sm:px-4 md:px-6 print:p-0 print:bg-white text-black font-sans relative">
      
      {/* Top bar — Back to Dashboard placed on the left */}
      <div className="no-print max-w-4xl mx-auto mb-2 flex items-center justify-start px-1">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          title="Return to dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Modern Frosted Action Header Bar */}
      <div className="no-print max-w-4xl mx-auto mb-4 sm:mb-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5 min-w-0">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 transition-all cursor-pointer shadow-2xs shrink-0"
            title="Back to Project Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-500 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                {pdfOutputName}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 text-[10px] font-mono font-semibold shrink-0">
                <CheckCircle2 className="w-3 h-3 mr-1 text-neutral-800" />
                ENTERPRISE READY
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 font-medium mt-0.5 truncate">
              Nutz Technovation Private Limited • Official Enterprise Specification Standard
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {/* Automatic Direct PDF File Download Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60 group"
            title="Automatically compiles and downloads the PDF file without browser headers"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-white" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 mr-2 transition-transform group-hover:translate-y-0.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>

          {/* Browser Clean Print / Preview (Zero Margin, No Browser Date/Header) */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center px-3.5 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl border border-neutral-200 shadow-2xs transition-all cursor-pointer"
            title="Open system print preview (date & page headers are removed)"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-neutral-600" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* 100% 1:1 Unified Official Nutz Document Printable Container */}
      <div 
        id="printable-nutz-document"
        ref={printDocRef}
        className="pdf-container max-w-4xl mx-auto bg-white p-3 sm:p-8 md:p-14 shadow-xl border border-neutral-200/80 rounded-2xl print:border-none print:shadow-none print:p-0 print:rounded-none text-black font-sans leading-relaxed overflow-x-auto"
      >
        <OfficialNutzDocument project={project} isPrintView={true} />
      </div>

    </div>
  );
}

