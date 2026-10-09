const http = require('http');

async function runTests() {
  console.log("=== Testing FRDG Portal Endpoints ===");

let authCookie = '';

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    };
    if (authCookie) {
      headers['Cookie'] = authCookie;
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 3000,
        path: path,
        method: method,
        headers: headers,
      },
      (res) => {
        const setCookie = res.headers['set-cookie'];
        if (setCookie && setCookie.length > 0) {
          authCookie = setCookie[0].split(';')[0];
        }

        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

  // 1. Taxonomy Test
  try {
    const taxRes = await makeRequest('/api/taxonomy');
    console.log(`[PASS] Taxonomy API: Status ${taxRes.status}, Total Categories: ${taxRes.data?.totalCategories}`);
  } catch (e) {
    console.error("[FAIL] Taxonomy API error:", e.message);
  }

  // 2. Auth Login Test
  try {
    const loginRes = await makeRequest('/api/auth/login', 'POST', {
      email: 'admin@nutz.in',
      password: 'admin123'
    });
    console.log(`[PASS] Admin Auth Login: Status ${loginRes.status}, User: ${loginRes.data?.user?.name} (${loginRes.data?.user?.role})`);
  } catch (e) {
    console.error("[FAIL] Auth Login error:", e.message);
  }

  // 3. AI Generation Test
  try {
    console.log("Testing NVIDIA AI generation...");
    const aiRes = await makeRequest('/api/ai/generate', 'POST', {
      projectName: 'Real Estate CRM & Builder ERP',
      companyName: 'Prestige Developers',
      productDescription: 'An enterprise real estate lead management, booking, and construction tracking platform',
      selectedCategories: ['ENTERPRISE BUSINESS SYSTEMS', 'REAL ESTATE', 'CONSTRUCTION'],
      selectedTypes: ['Customer Relationship Management (CRM)', 'Builder ERP', 'Construction ERP'],
      selectedModules: ['Lead Management', 'Project Planning', 'Site Management', 'BOQ'],
      selectedSubModules: ['Lead Sources', 'Phases', 'Daily Reports', 'BOQ Items'],
      selectedSubSubModules: ['Website', 'Construction', 'Daily progress', 'BOQ Materials']
    });
    console.log(`[PASS] AI Generation: Status ${aiRes.status}, Has Flows: ${!!aiRes.data?.data?.architectureFlows}, Phases Count: ${aiRes.data?.data?.implementationPhases?.length}`);
  } catch (e) {
    console.error("[FAIL] AI Generation error:", e.message);
  }

  // 4. Create Project Test
  try {
    const projRes = await makeRequest('/api/projects', 'POST', {
      projectName: 'Inquiry - Enterprise CRM & ERP',
      companyName: 'Nutz Technovation Client',
      contactPerson: 'Client Rep',
      contactEmail: 'client@example.com',
      productDescription: 'Full ERP and CRM solution',
      selectedCategoryIds: ['cat-1', 'cat-4', 'cat-14'],
      selectedTypeIds: ['type-1-1', 'type-4-1', 'type-14-2'],
      selectedModuleIds: ['mod-1-1-1', 'mod-4-1-1', 'mod-14-2-1'],
      selectedSubModuleIds: ['sub-1-1-1-1', 'sub-4-1-1-1'],
      selectedSubSubModuleIds: ['ss-1-1-1-1-1', 'ss-4-1-1-1-1'],
      pdfFileName: 'Inquiry_FRD_Document.pdf'
    });
    console.log(`[PASS] Create Project: Status ${projRes.status}, Created Project ID: ${projRes.data?.project?.id}`);
    
    // 5. Fetch Project Details
    if (projRes.data?.project?.id) {
      const getRes = await makeRequest(`/api/projects/${projRes.data.project.id}`);
      console.log(`[PASS] Get Project Details: Status ${getRes.status}, Name: ${getRes.data?.project?.projectName}`);
    }
  } catch (e) {
    console.error("[FAIL] Project Creation error:", e.message);
  }

  console.log("=== All Tests Completed ===");
}

runTests();
