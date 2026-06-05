document.addEventListener('DOMContentLoaded', () => {

  // --- STICKY NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION BAR ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Close menu when a navigation item is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });

  // --- SOLUTIONS TABS SWITCHING ---
  const tabButtons = document.querySelectorAll('.feature-tab-btn');
  const panels = document.querySelectorAll('.feature-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all tab buttons
      tabButtons.forEach(t => t.classList.remove('active'));
      // Activate this button
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      // Hide all solution panels
      panels.forEach(panel => {
        panel.classList.remove('active');
      });

      // Show the targeted panel
      const activePanel = document.getElementById(`pane-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // --- SUB-WIDGET: INTERACTIVE TRUCK LOAD CONSOLIDATION SIMULATOR ---
  const slider = document.getElementById('consolidation-slider');
  const shipmentCountLabel = document.getElementById('widget-shipment-count');
  const spacePctLabel = document.getElementById('widget-space-pct');
  const marginPctLabel = document.getElementById('widget-margin-pct');
  const sliderVal = document.getElementById('slider-val');
  const cargoBed = document.getElementById('cargo-bed');

  const cargoColors = [
    'linear-gradient(135deg, #063ba2, #2563eb)', // Royal Blue
    'linear-gradient(135deg, #d30f1a, #ef4444)', // Crimson Red
    'linear-gradient(135deg, #0e1635, #1e293b)', // Dark Slate Blue
    'linear-gradient(135deg, #ff2a3b, #f43f5e)', // Neon Red
    'linear-gradient(135deg, #60a5fa, #3b82f6)', // Light Blue
    'linear-gradient(135deg, #f8fafc, #cbd5e1)'  // White/Light Gray
  ];

  function updateConsolidation(shipmentCount) {
    if (!sliderVal || !shipmentCountLabel || !spacePctLabel || !marginPctLabel || !cargoBed) return;
    
    sliderVal.textContent = shipmentCount;
    shipmentCountLabel.textContent = `${shipmentCount} Cargo${shipmentCount > 1 ? 'es' : ''}`;
    
    // Simulate optimizations metrics mathematically
    const spaceUtilized = Math.min(shipmentCount * 15, 90);
    const marginOffset = Math.round(shipmentCount * 6.5);

    spacePctLabel.textContent = `${spaceUtilized}%`;
    marginPctLabel.textContent = `+${marginOffset}%`;

    // Render cargo boxes dynamically inside truck container bed
    cargoBed.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
      const box = document.createElement('div');
      box.className = 'cargo-box';
      box.textContent = `C${i}`;
      box.style.background = cargoColors[(i - 1) % cargoColors.length];
      cargoBed.appendChild(box);
      
      // Animate arrival
      if (i <= shipmentCount) {
        setTimeout(() => {
          box.classList.add('loaded');
        }, i * 120);
      }
    }
  }

  // Initialize interactive consolidation simulator
  if (slider) {
    updateConsolidation(slider.value);
    slider.addEventListener('input', (e) => {
      updateConsolidation(parseInt(e.target.value));
    });
  }

  // --- HERO PORTAL BENCHMARK TIMER ---
  const heroBenchmark = document.getElementById('floating-savings-pct');
  if (heroBenchmark) {
    function runBenchmark() {
      let time = 18.0;
      heroBenchmark.style.color = 'var(--color-accent)';
      
      const interval = setInterval(() => {
        time -= 0.8;
        if (time <= 1.2) {
          time = 1.2;
          clearInterval(interval);
          heroBenchmark.style.color = 'var(--color-primary)';
          heroBenchmark.textContent = `${time.toFixed(1)}s Auto-Quote`;
          setTimeout(runBenchmark, 4500); // pause and repeat
        } else {
          heroBenchmark.textContent = `${time.toFixed(1)}s`;
        }
      }, 50);
    }
    runBenchmark();
  }

  // --- DYNAMIC INTERACTIVE 3D TILT PARALLAX ---
  function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const bounds = el.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        // Percent coordinate offsets (-0.5 to 0.5)
        const pctX = (mouseX / bounds.width) - 0.5;
        const pctY = (mouseY / bounds.height) - 0.5;
        
        // Max tilt angles in degrees
        const maxTiltX = 14;
        const maxTiltY = 14;
        
        const rX = pctY * -maxTiltX;
        const rY = pctX * maxTiltY;
        
        if (el.id === 'hero-showcase-wrapper' || el.id === 'demo-mockup-device') {
          const img = el.querySelector('#hero-showcase-img');
          const card = el.querySelector('#hero-floating-card');
          if (img) {
            img.style.transform = `rotateY(${rY - 14}deg) rotateX(${rX + 10}deg) scale(1.02)`;
          }
          if (card) {
            card.style.transform = `translate3d(${rY * -1.5}px, ${rX * -1.5}px, 90px)`;
          }
          if (el.id === 'demo-mockup-device') {
            el.style.transform = `rotateX(${rX * 0.8}deg) rotateY(${rY * 0.8}deg) scale(1.01)`;
          }
        } else {
          el.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) translateY(-6px)`;
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (el.id === 'hero-showcase-wrapper' || el.id === 'demo-mockup-device') {
          const img = el.querySelector('#hero-showcase-img');
          const card = el.querySelector('#hero-floating-card');
          if (img) {
            img.style.transform = '';
          }
          if (card) {
            card.style.transform = '';
          }
          if (el.id === 'demo-mockup-device') {
            el.style.transform = '';
          }
        } else {
          el.style.transform = '';
        }
      });
    });
  }

  init3DTilt();

  // --- BACKGROUND DATA PARTICLES INJECTOR ---
  function initBgParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;

    const particleCount = 20;
    const colors = [
      'rgba(6, 59, 162, 0.18)',   /* Logo Royal Blue */
      'rgba(211, 15, 26, 0.15)',   /* Logo Crimson Red */
      'rgba(255, 42, 59, 0.12)'    /* Accent Neon Red */
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      
      // Randomize sizes
      const size = Math.floor(Math.random() * 8) + 4; // 4px to 12px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Randomize position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `${Math.random() * -10}%`;
      
      // Randomize animation duration and delay
      const duration = Math.random() * 18 + 12;
      const delay = Math.random() * 18;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Randomize particle colors
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
    }
  }

  initBgParticles();

  // --- BACKGROUND INTERACTIVE LOGISTICS CANVAS MAP ---
  function initLogisticsMap() {
    const canvas = document.getElementById('logistics-map-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Scale canvas to window size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Ports coordinates (represented as percentages for responsiveness)
    const ports = [
      { name: "New York", xPct: 0.15, yPct: 0.28 },
      { name: "London", xPct: 0.40, yPct: 0.20 },
      { name: "Rotterdam", xPct: 0.46, yPct: 0.24 },
      { name: "Mumbai", xPct: 0.64, yPct: 0.58 },
      { name: "Singapore", xPct: 0.75, yPct: 0.70 },
      { name: "Shanghai", xPct: 0.82, yPct: 0.44 },
      { name: "Sydney", xPct: 0.88, yPct: 0.84 },
      { name: "Cape Town", xPct: 0.50, yPct: 0.80 },
      { name: "San Francisco", xPct: 0.08, yPct: 0.42 }
    ];

    // Connect ports with lanes
    const lanes = [
      { from: 8, to: 0 }, // SF to NY
      { from: 0, to: 1 }, // NY to London
      { from: 1, to: 2 }, // London to Rotterdam
      { from: 2, to: 7 }, // Rotterdam to Cape Town
      { from: 7, to: 3 }, // Cape Town to Mumbai
      { from: 3, to: 4 }, // Mumbai to Singapore
      { from: 4, to: 5 }, // Singapore to Shanghai
      { from: 5, to: 6 }, // Shanghai to Sydney
      { from: 4, to: 6 }, // Singapore to Sydney
      { from: 2, to: 3 }, // Rotterdam to Mumbai
      { from: 8, to: 5 }  // SF to Shanghai
    ];

    // Cargo Flow Pulses
    const pulses = [];
    const pulseCount = 14;

    for (let i = 0; i < pulseCount; i++) {
      const laneIdx = Math.floor(Math.random() * lanes.length);
      pulses.push({
        laneIdx: laneIdx,
        progress: Math.random(),
        speed: Math.random() * 0.0012 + 0.0006,
        color: Math.random() > 0.5 ? '#063ba2' : '#d30f1a', // logo blue or red
        size: Math.random() * 2 + 2 // 2px to 4px
      });
    }

    // Animation Loop
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // 1. Draw connecting shipping lanes (dashed lines)
      ctx.strokeStyle = "rgba(6, 59, 162, 0.06)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);

      lanes.forEach(lane => {
        const fromPort = ports[lane.from];
        const toPort = ports[lane.to];
        ctx.beginPath();
        ctx.moveTo(fromPort.xPct * w, fromPort.yPct * h);
        ctx.lineTo(toPort.xPct * w, toPort.yPct * h);
        ctx.stroke();
      });

      ctx.setLineDash([]); // reset dash

      // 2. Update and draw cargo flow pulses
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.laneIdx = Math.floor(Math.random() * lanes.length); // switch lane
        }

        const lane = lanes[pulse.laneIdx];
        const fromPort = ports[lane.from];
        const toPort = ports[lane.to];

        const fx = fromPort.xPct * w;
        const fy = fromPort.yPct * h;
        const tx = toPort.xPct * w;
        const ty = toPort.yPct * h;

        // Current coordinates of the pulse
        const cx = fx + (tx - fx) * pulse.progress;
        const cy = fy + (ty - fy) * pulse.progress;

        // Draw glowing cargo flow dot
        ctx.fillStyle = pulse.color;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow effect around cargo
        ctx.shadowBlur = 6;
        ctx.shadowColor = pulse.color;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(cx, cy, pulse.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      // 3. Draw port dots (pulsing circles)
      ports.forEach((port, idx) => {
        const px = port.xPct * w;
        const py = port.yPct * h;

        const pulseScale = 1 + Math.sin(Date.now() * 0.002 + idx) * 0.2;
        const color = idx % 2 === 0 ? "rgba(6, 59, 162, 0.3)" : "rgba(211, 15, 26, 0.25)";
        
        // Outer pulsing ring
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 7 * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Core port dot
        ctx.fillStyle = idx % 2 === 0 ? "#063ba2" : "#d30f1a";
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Optional port label
        ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
        ctx.font = "8px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(port.name, px, py - 10);
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  initLogisticsMap();

  // --- SCROLL REVEALS (INTERSECTION OBSERVER) ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // --- SCROLLYTELLING LOGISTICS DEMO OBSERVER & ANIMATIONS ---
  function initScrollytelling() {
    const steps = document.querySelectorAll('.demo-step-card');
    const screens = document.querySelectorAll('.demo-screen');
    const deviceTitle = document.getElementById('demo-screen-title');
    let activeStepNum = null;
    let typingIntervals = [];

    // Helper: Simulated typist writer script
    function typeSim(elementId, text, delayBetweenLetters, callback) {
      const el = document.getElementById(elementId);
      if (!el) return;
      
      el.innerHTML = ''; // Clear previous
      let i = 0;
      
      // Append blinking cursor
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      el.appendChild(cursor);

      const interval = setInterval(() => {
        if (i < text.length) {
          const letter = document.createTextNode(text.charAt(i));
          el.insertBefore(letter, cursor);
          i++;
        } else {
          clearInterval(interval);
          cursor.remove();
          if (callback) callback();
        }
      }, delayBetweenLetters);

      typingIntervals.push(interval);
    }

    // Reset Step 1 screen fields
    function resetStep1() {
      typingIntervals.forEach(clearInterval);
      typingIntervals = [];
      
      const inputs = ['sim-input-cargo', 'sim-input-origin', 'sim-input-dest', 'sim-input-client'];
      inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
      });
      
      const btn = document.getElementById('sim-submit-btn');
      if (btn) {
        btn.innerHTML = `<span>Create Inquiry</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
        btn.style.opacity = '1';
      }
    }

    // Reset Step 6 uploads progress
    let uploadInterval = null;
    function resetStep6() {
      if (uploadInterval) clearInterval(uploadInterval);
      
      const progressFill = document.getElementById('vault-progress-fill');
      const progressPct = document.getElementById('vault-upload-pct');
      const filenameLabel = document.getElementById('vault-uploading-filename');
      const f1 = document.getElementById('vault-file-1');
      const f2 = document.getElementById('vault-file-2');
      
      if (progressFill) progressFill.style.width = '0%';
      if (progressPct) progressPct.textContent = '0%';
      if (filenameLabel) filenameLabel.textContent = 'Bill_of_Lading_Draft.pdf';
      if (f1) f1.style.display = 'none';
      if (f2) f2.style.display = 'none';
    }

    // Step-specific animation triggers
    function runStepAnimations(stepNum) {
      if (activeStepNum === stepNum) return; // Prevent restart loops
      activeStepNum = stepNum;

      // Update screen title
      const screenTitles = [
        "Inquiry Registration Mockup",
        "RFQ Distribution Channels",
        "Carrier Tariff Comparison Matrix",
        "Shipment Pipeline Tracking",
        "Financial Billing & Accounting Logs",
        "Isolated Data Vault Documents"
      ];
      if (deviceTitle) deviceTitle.textContent = screenTitles[stepNum - 1];

      // 1. Reset all screens
      resetStep1();
      resetStep6();

      // Deactivate all network links
      const netLines = document.querySelectorAll('.net-line');
      netLines.forEach(l => l.classList.remove('animating'));
      const netNodes = document.querySelectorAll('.network-node');
      netNodes.forEach(n => n.classList.remove('active'));

      // 2. Trigger active animation
      if (stepNum === 1) {
        // Step 1: Type Cargo
        typeSim('sim-input-cargo', '20FT General Cargo Container', 40, () => {
          // Type Origin
          typeSim('sim-input-origin', 'Mumbai (INBOM)', 45, () => {
            // Type Destination
            typeSim('sim-input-dest', 'Rotterdam (NLRTM)', 45, () => {
              // Type Client
              typeSim('sim-input-client', 'ABC Import-Export Ltd.', 40, () => {
                // Simulate Submit click
                const btn = document.getElementById('sim-submit-btn');
                if (btn) {
                  btn.innerHTML = 'Creating Inquiry... <span class="spinner"></span>';
                  setTimeout(() => {
                    btn.innerHTML = 'Inquiry Registered ✓';
                    btn.style.opacity = '0.8';
                  }, 1200);
                }
              });
            });
          });
        });
      }
      else if (stepNum === 2) {
        // Step 2: Animate RFQ broadcast pipelines
        setTimeout(() => {
          netLines.forEach(l => l.classList.add('animating'));
          
          // Stagger node activation
          const order = ['node-vendor-1', 'node-vendor-2', 'node-vendor-3', 'node-vendor-4'];
          order.forEach((id, idx) => {
            setTimeout(() => {
              const node = document.getElementById(id);
              if (node) node.classList.add('active');
            }, idx * 600 + 400);
          });
        }, 300);
      }
      else if (stepNum === 3) {
        // Step 3: Highlight comparison matrix
        const rows = ['row-carrier-msc', 'row-carrier-maersk', 'row-carrier-cma', 'row-carrier-hapag'];
        const maerskRow = document.getElementById('row-carrier-maersk');
        
        if (maerskRow) {
          maerskRow.classList.remove('selected-row');
          const badge = maerskRow.querySelector('.row-badge');
          if (badge) badge.className = 'row-badge row-badge-gray';
        }

        // Delay best deal selection
        setTimeout(() => {
          if (maerskRow) {
            maerskRow.classList.add('selected-row');
            const badge = maerskRow.querySelector('.row-badge');
            if (badge) {
              badge.className = 'row-badge row-badge-green';
              badge.textContent = 'Best Value';
            }
          }
        }, 1600);
      }
      else if (stepNum === 4) {
        // Step 4: Map cargo animation runs automatically in CSS keyframes
        // We pulse operational milestones
        const milestones = ['m-s1', 'm-s2', 'm-s3', 'm-s4'];
        milestones.forEach((id, idx) => {
          const el = document.getElementById(id);
          if (el) {
            el.className = 'ops-milestone';
            if (idx < 2) {
              el.classList.add('completed');
            } else if (idx === 2) {
              el.classList.add('active');
            }
          }
        });
      }
      else if (stepNum === 5) {
        // Step 5: Finance card numbers / status load
        const pill = document.querySelector('.invoice-status-pill');
        if (pill) {
          pill.className = 'invoice-status-pill';
          pill.textContent = 'Awaiting Settlement';
          
          setTimeout(() => {
            pill.style.background = 'rgba(16, 185, 129, 0.15)';
            pill.style.color = '#10b981';
            pill.textContent = 'Booked & Sent';
          }, 1500);
        }
      }
      else if (stepNum === 6) {
        // Step 6: File upload progression
        const progressFill = document.getElementById('vault-progress-fill');
        const progressPct = document.getElementById('vault-upload-pct');
        const filenameLabel = document.getElementById('vault-uploading-filename');
        const f1 = document.getElementById('vault-file-1');
        const f2 = document.getElementById('vault-file-2');

        let pct = 0;
        uploadInterval = setInterval(() => {
          pct += 5;
          if (progressFill) progressFill.style.width = `${pct}%`;
          if (progressPct) progressPct.textContent = `${pct}%`;

          if (pct === 100) {
            clearInterval(uploadInterval);
            if (f1) f1.style.display = 'flex';
            
            // Start second file upload simulation
            setTimeout(() => {
              if (filenameLabel) filenameLabel.textContent = 'Certificate_of_Origin.pdf';
              if (progressFill) progressFill.style.width = '0%';
              if (progressPct) progressPct.textContent = '0%';
              
              let pct2 = 0;
              uploadInterval = setInterval(() => {
                pct2 += 8;
                if (progressFill) progressFill.style.width = `${pct2}%`;
                if (progressPct) progressPct.textContent = `${pct2}%`;
                
                if (pct2 >= 100) {
                  if (progressFill) progressFill.style.width = '100%';
                  if (progressPct) progressPct.textContent = '100%';
                  clearInterval(uploadInterval);
                  if (f2) f2.style.display = 'flex';
                  if (filenameLabel) filenameLabel.textContent = 'Vault Uploads Complete ✓';
                }
              }, 60);
            }, 1000);
          }
        }, 70);
      }
    }

    // Scroll Intersection Observer focuses on centered steps description cards
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepNum = parseInt(entry.target.getAttribute('data-step'));
          
          // 1. Remove active state from all description card steps
          steps.forEach(s => s.classList.remove('active'));
          // 2. Mark centered card active
          entry.target.classList.add('active');

          // 3. Switch active device screen frame
          screens.forEach(scr => scr.classList.remove('active'));
          const targetScreen = document.getElementById(`screen-step-${stepNum}`);
          if (targetScreen) targetScreen.classList.add('active');

          // 4. Run screen animations
          runStepAnimations(stepNum);
        }
      });
    }, {
      threshold: 0.55, // card must be in viewport center to trigger
      rootMargin: '-10% 0px -30% 0px'
    });

    steps.forEach(step => {
      stepObserver.observe(step);
    });
  }

  // Initialize scrollytelling
  initScrollytelling();

  // --- INQUIRY CONTACT FORM SUBMISSION HANDLER ---
  const inquiryForm = document.getElementById('inquiry-form');
  const formStatus = document.getElementById('form-status-message');
  const submitBtn = document.getElementById('btn-submit-form');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const company = document.getElementById('contact-company').value.trim();
      const plan = document.getElementById('contact-plan').options[document.getElementById('contact-plan').selectedIndex].text;
      const message = document.getElementById('contact-message').value.trim();

      // Deactivate submit button
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Connecting with CEO office... <span class="spinner"></span>';
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Simulate API submit delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (name && email && company && message) {
          formStatus.className = 'form-status success';
          formStatus.textContent = `Success! Your inquiry has been routed directly to our Managing Director & CEO, Yajat Chordiya (yajat0747@gmail.com). A customized scope review for the "${plan}" has been registered. We will contact you at ${email} within 24 hours.`;
          inquiryForm.reset();
          if (slider) updateConsolidation(slider.value); // reset interactive widget
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Incomplete details. Please review form entries and submit again.';
        }
      }, 1500);
    });
  }

});
