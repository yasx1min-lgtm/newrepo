#!/usr/bin/env node

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log('\n' + '='.repeat(60));
console.log('📅 BOOKING SYSTEM - INTERACTIVE SETUP');
console.log('='.repeat(60) + '\n');

console.log('This wizard will help you configure your booking system.\n');

async function setup() {
    const config = {};

    // Zoom Configuration
    console.log('🎥 ZOOM CONFIGURATION');
    console.log('Get your credentials from: https://marketplace.zoom.us/develop/create\n');
    
    config.ZOOM_CLIENT_ID = await question('Zoom Client ID: ');
    config.ZOOM_CLIENT_SECRET = await question('Zoom Client Secret: ');
    config.ZOOM_ACCOUNT_ID = await question('Zoom Account ID: ');

    // Hapio Configuration
    console.log('\n📆 HAPIO CONFIGURATION');
    console.log('Get your credentials from: https://hapio.net/dashboard\n');
    
    config.HAPIO_API_KEY = await question('Hapio API Key: ');
    config.HAPIO_SERVICE_ID = await question('Hapio Service ID: ');
    config.HAPIO_LOCATION_ID = await question('Hapio Location ID: ');

    // Email Configuration
    console.log('\n📧 EMAIL CONFIGURATION');
    console.log('For Gmail: Use smtp.gmail.com with an App Password');
    console.log('For SendGrid: Use smtp.sendgrid.net with API key');
    console.log('Leave blank to use development mode (Ethereal)\n');
    
    const useEmail = await question('Configure email now? (y/n): ');
    
    if (useEmail.toLowerCase() === 'y') {
        config.SMTP_HOST = await question('SMTP Host (e.g., smtp.gmail.com): ');
        config.SMTP_PORT = await question('SMTP Port (default 587): ') || '587';
        config.SMTP_SECURE = await question('Use SSL/TLS? (true/false, default false): ') || 'false';
        config.SMTP_USER = await question('SMTP Username/Email: ');
        config.SMTP_PASS = await question('SMTP Password/API Key: ');
        config.EMAIL_FROM = await question('From Email Address: ');
        config.EMAIL_FROM_NAME = await question('From Name (e.g., "Booking System"): ');
        config.SUPPORT_EMAIL = await question('Support Email: ');
    } else {
        console.log('\nℹ️  Skipping email setup - will use development mode');
        console.log('   Create a test account at: https://ethereal.email/\n');
    }

    // Server Configuration
    console.log('\n⚙️  SERVER CONFIGURATION\n');
    
    config.PORT = await question('Server Port (default 3000): ') || '3000';
    config.NODE_ENV = await question('Environment (development/production, default development): ') || 'development';
    config.CORS_ORIGIN = await question('CORS Origin (default *): ') || '*';

    // Generate .env file
    const envPath = path.join(__dirname, '..', '.env');
    let envContent = '';

    envContent += '# Zoom OAuth Credentials\n';
    envContent += `ZOOM_CLIENT_ID=${config.ZOOM_CLIENT_ID}\n`;
    envContent += `ZOOM_CLIENT_SECRET=${config.ZOOM_CLIENT_SECRET}\n`;
    envContent += `ZOOM_ACCOUNT_ID=${config.ZOOM_ACCOUNT_ID}\n\n`;

    envContent += '# Hapio API Credentials\n';
    envContent += `HAPIO_API_KEY=${config.HAPIO_API_KEY}\n`;
    envContent += `HAPIO_SERVICE_ID=${config.HAPIO_SERVICE_ID}\n`;
    envContent += `HAPIO_LOCATION_ID=${config.HAPIO_LOCATION_ID}\n\n`;

    if (config.SMTP_HOST) {
        envContent += '# Email Configuration (SMTP)\n';
        envContent += `SMTP_HOST=${config.SMTP_HOST}\n`;
        envContent += `SMTP_PORT=${config.SMTP_PORT}\n`;
        envContent += `SMTP_SECURE=${config.SMTP_SECURE}\n`;
        envContent += `SMTP_USER=${config.SMTP_USER}\n`;
        envContent += `SMTP_PASS=${config.SMTP_PASS}\n\n`;
        envContent += '# Email Settings\n';
        envContent += `EMAIL_FROM=${config.EMAIL_FROM}\n`;
        envContent += `EMAIL_FROM_NAME=${config.EMAIL_FROM_NAME}\n`;
        envContent += `SUPPORT_EMAIL=${config.SUPPORT_EMAIL}\n\n`;
    } else {
        envContent += '# Email Configuration (Development Mode)\n';
        envContent += '# Create account at: https://ethereal.email/\n';
        envContent += '# ETHEREAL_USER=your_ethereal_user\n';
        envContent += '# ETHEREAL_PASS=your_ethereal_pass\n\n';
    }

    envContent += '# Server Configuration\n';
    envContent += `PORT=${config.PORT}\n`;
    envContent += `NODE_ENV=${config.NODE_ENV}\n`;
    envContent += `CORS_ORIGIN=${config.CORS_ORIGIN}\n`;

    fs.writeFileSync(envPath, envContent);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SETUP COMPLETE!');
    console.log('='.repeat(60));
    console.log('\n📝 Configuration saved to: .env');
    console.log('\n🚀 Next steps:');
    console.log('   1. Review your .env file');
    console.log('   2. Install dependencies: npm install');
    console.log('   3. Start the server: npm start (or npm run dev)');
    console.log('   4. Open http://localhost:' + config.PORT + '\n');

    if (!config.SMTP_HOST) {
        console.log('⚠️  Email is in development mode');
        console.log('   To enable real emails, add SMTP credentials to .env\n');
    }

    rl.close();
}

setup().catch(err => {
    console.error('\n❌ Setup failed:', err.message);
    rl.close();
    process.exit(1);
});