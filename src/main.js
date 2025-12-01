// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Chart.js for Dashboard (Simple implementation)
const ctx = document.getElementById('dataChart');
if (ctx) {
    // Simple canvas chart drawing
    const canvas = ctx.getContext('2d');
    const width = ctx.width;
    const height = ctx.height;

    // Sample data visualization
    canvas.fillStyle = '#667eea';
    canvas.fillRect(50, 80, 40, 120);
    canvas.fillRect(100, 60, 40, 140);
    canvas.fillRect(150, 40, 40, 160);
    canvas.fillRect(200, 70, 40, 130);
    canvas.fillRect(250, 50, 40, 150);

    canvas.fillStyle = '#333';
    canvas.font = '12px Inter';
    canvas.fillText('Jan', 55, 220);
    canvas.fillText('Feb', 105, 220);
    canvas.fillText('Mar', 155, 220);
    canvas.fillText('Apr', 205, 220);
    canvas.fillText('Mei', 255, 220);
}

// Report Form Handler
const reportForm = document.getElementById('report-form');
const reportsList = document.getElementById('reports-list');
const reportsCount = document.getElementById('reports-stat');
let reports = [];

reportForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(reportForm);
    const report = {
        id: Date.now(),
        name: reportForm.querySelector('input[type="text"]').value,
        category: reportForm.querySelector('select').value,
        location: reportForm.querySelectorAll('input[type="text"]')[1].value,
        description: reportForm.querySelector('textarea').value,
        date: new Date().toLocaleDateString('id-ID'),
        status: 'Baru'
    };

    reports.unshift(report);
    displayReports();
    reportForm.reset();

    // Update stats
    reportsCount.textContent = reports.length;

    // Show success message
    showNotification('Laporan berhasil dikirim!', 'success');
});

function displayReports() {
    if (reports.length === 0) {
        reportsList.innerHTML = '<p class="text-gray-500 text-center py-4">Belum ada laporan. Jadilah yang pertama!</p>';
        return;
    }

    reportsList.innerHTML = reports.map(report => `
        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-semibold text-gray-800">${report.name}</span>
                        <span class="text-gray-400">•</span>
                        <span class="text-sm text-gray-500">${report.date}</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-semibold">${report.category}</span>
                        <span class="text-gray-600 text-sm"><i class="fas fa-map-marker-alt mr-1"></i>${report.location}</span>
                    </div>
                </div>
                <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">${report.status}</span>
            </div>
            <p class="text-gray-700">${report.description}</p>
            <div class="mt-3 flex gap-3">
                <button class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    <i class="fas fa-thumbs-up mr-1"></i>Dukung
                </button>
                <button class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    <i class="fas fa-comment mr-1"></i>Komentar
                </button>
            </div>
        </div>
    `).join('');
}

// Survey Form Handler
const surveyForm = document.getElementById('survey-form');
let surveyVotes = {
    infrastruktur: 0,
    pendidikan: 0,
    kesehatan: 0,
    lingkungan: 0,
    ekonomi: 0
};

surveyForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const checkedBoxes = surveyForm.querySelectorAll('input[name="issue"]:checked');

    if (checkedBoxes.length === 0) {
        showNotification('Silakan pilih minimal satu isu', 'error');
        return;
    }

    checkedBoxes.forEach(checkbox => {
        surveyVotes[checkbox.value]++;
    });

    updateSurveyDisplay();

    // Reset form
    surveyForm.reset();

    showNotification('Terima kasih atas partisipasi Anda!', 'success');
});

function updateSurveyDisplay() {
    document.getElementById('infra-votes').textContent = surveyVotes.infrastruktur + ' suara';
    document.getElementById('edu-votes').textContent = surveyVotes.pendidikan + ' suara';
    document.getElementById('health-votes').textContent = surveyVotes.kesehatan + ' suara';
    document.getElementById('env-votes').textContent = surveyVotes.lingkungan + ' suara';
    document.getElementById('econ-votes').textContent = surveyVotes.ekonomi + ' suara';
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl"></i>
            <span class="font-medium">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Dynamic Stats Update (simulating real-time data)
function updateStats() {
    const populationStat = document.getElementById('population-stat');
    const growthStat = document.getElementById('growth-stat');

    // Simulate minor fluctuations
    setInterval(() => {
        const growth = (5.2 + Math.random() * 0.2 - 0.1).toFixed(1);
        if (growthStat) {
            growthStat.textContent = growth + '%';
        }
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    displayReports();
    updateSurveyDisplay();
    updateStats();

    // Add animation to feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// API Integration Functions (to be connected with backend)
async function fetchDashboardData() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        // Update dashboard with real data
        return data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
}

async function submitReport(reportData) {
    try {
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error submitting report:', error);
    }
}

async function submitSurvey(surveyData) {
    try {
        const response = await fetch('/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error submitting survey:', error);
    }
}

async function loadForumThreads() {
    try {
        const response = await fetch('/api/forum/threads');
        const threads = await response.json();
        // Display forum threads
        return threads;
    } catch (error) {
        console.error('Error loading forum threads:', error);
    }
}
