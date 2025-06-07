// src/js/email-template.js
// Email Template System Integration Module

class EmailTemplateSystem {
  constructor() {
    this.baseUrl = "/api";
    this.templates = new Map();
    this.placeholders = [
      { key: "name", label: "[name]", type: "text" },
      { key: "firstName", label: "[firstName]", type: "text" },
      { key: "lastName", label: "[lastName]", type: "text" },
      { key: "email", label: "[email]", type: "email" },
      { key: "dob", label: "[dob]", type: "date" },
      { key: "company", label: "[company]", type: "text" },
      { key: "position", label: "[position]", type: "text" },
      { key: "date", label: "[date]", type: "date" },
      { key: "phone", label: "[phone]", type: "tel" },
      { key: "address", label: "[address]", type: "text" },
    ];

    this.initMockData();
  }

  // Initialize with default templates
  initMockData() {
    const defaultTemplates = [
      {
        id: "welcome_001",
        name: "Welcome Email",
        subject: "Welcome to [company], [firstName]!",
        content: `<h2>Welcome to our team, [firstName]!</h2>
                         <p>Dear [name],</p>
                         <p>We are excited to welcome you to [company] as our new [position]. Your journey with us begins on [date].</p>
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                         <p>Please find attached your welcome package and first-day information.</p>
                         <p>We look forward to working with you!</p>`,
        signature: "Best regards,\nHR Team\n[company]\n[email]\n[phone]",
        attachments: ["welcome_package.pdf", "employee_handbook.pdf"],
        category: "HR",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "rejection_001",
        name: "Application Rejection",
        subject: "Your Application for [position] at [company]",
        content: `<p>Dear [firstName],</p>
                         <p>Thank you for your interest in the [position] role at [company] and for taking the time to interview with our team.</p>
                         <p>After careful consideration and review of all candidates, we have decided to move forward with another applicant whose experience more closely aligns with our current needs.</p>
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We were impressed by your qualifications and encourage you to apply for future openings that match your skills and experience.</p>
                         <p>We wish you all the best in your job search and future professional endeavors.</p>`,
        signature: "Best regards,\nHiring Team\n[company]",
        attachments: [],
        category: "Recruitment",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "interview_001",
        name: "Interview Invitation",
        subject: "Interview Invitation - [position] at [company]",
        content: `<h3>Interview Invitation</h3>
                         <p>Dear [firstName],</p>
                         <p>We are pleased to invite you for an interview for the [position] position at [company].</p>
                         <p><strong>Interview Details:</strong></p>
                         <ul>
                           <li><strong>Date:</strong> [date]</li>
                           <li><strong>Time:</strong> Please confirm your availability</li>
                           <li><strong>Duration:</strong> Approximately 1 hour</li>
                           <li><strong>Format:</strong> Video call via Zoom</li>
                           <li><strong>Interviewer:</strong> Hiring Manager</li>
                         </ul>
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Please reply to this email to confirm your attendance and let us know if you have any questions.</p>
                         <p>We look forward to speaking with you!</p>`,
        signature: "Best regards,\nRecruitment Team\n[company]\n[email]",
        attachments: ["interview_guide.pdf"],
        category: "Recruitment",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    defaultTemplates.forEach((template) => {
      this.templates.set(template.id, template);
    });
  }

  // API Mock Functions
  async getAllTemplates() {
    try {
      // Simulate API delay
      await this.delay(500);

      const templates = Array.from(this.templates.values());
      return {
        success: true,
        data: templates,
        total: templates.length,
        page: 1,
        limit: 10,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTemplate(id) {
    try {
      await this.delay(300);

      const template = this.templates.get(id);
      if (!template) {
        throw new Error("Template not found");
      }

      return {
        success: true,
        data: template,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createTemplate(templateData) {
    try {
      await this.delay(800);

      const id = "template_" + Date.now();
      const template = {
        id,
        ...templateData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };

      this.templates.set(id, template);

      return {
        success: true,
        data: template,
        message: "Template created successfully",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateTemplate(id, templateData) {
    try {
      await this.delay(600);

      const existingTemplate = this.templates.get(id);
      if (!existingTemplate) {
        throw new Error("Template not found");
      }

      const updatedTemplate = {
        ...existingTemplate,
        ...templateData,
        updatedAt: new Date().toISOString(),
      };

      this.templates.set(id, updatedTemplate);

      return {
        success: true,
        data: updatedTemplate,
        message: "Template updated successfully",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteTemplate(id) {
    try {
      await this.delay(400);

      if (!this.templates.has(id)) {
        throw new Error("Template not found");
      }

      this.templates.delete(id);

      return {
        success: true,
        message: "Template deleted successfully",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sendEmail(emailData) {
    try {
      await this.delay(1200);

      // Validate required fields
      if (!emailData.templateId || !emailData.recipient) {
        throw new Error("Template ID and recipient are required");
      }

      const jobId = "job_" + Date.now();

      // Simulate background job creation
      const job = {
        id: jobId,
        type: "send_email",
        status: "queued",
        data: emailData,
        createdAt: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 30000).toISOString(),
      };

      return {
        success: true,
        data: job,
        message: "Email queued for sending",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async uploadAttachment(file) {
    try {
      await this.delay(1000);

      // Simulate file upload
      const attachment = {
        id: "att_" + Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: "/uploads/" + file.name,
        uploadedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: attachment,
        message: "File uploaded successfully",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Placeholder management
  replacePlaceholders(text, data) {
    if (!text || !data) return text;

    let result = text;
    Object.keys(data).forEach((key) => {
      const placeholder = `[${key}]`;
      const value = data[key] || placeholder;
      result = result.replace(new RegExp(`\\[${key}\\]`, "g"), value);
    });

    return result;
  }

  validateTemplate(templateData) {
    const errors = [];

    if (!templateData.name || templateData.name.trim() === "") {
      errors.push("Template name is required");
    }

    if (!templateData.subject || templateData.subject.trim() === "") {
      errors.push("Subject line is required");
    }

    if (!templateData.content || templateData.content.trim() === "") {
      errors.push("Template content is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Utility functions
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Integration with inbox-details.html
  setupInboxIntegration() {
    // Add event listener for compose button
    document.addEventListener("DOMContentLoaded", () => {
      const composeButton = document.querySelector(
        ".compose-button, [data-compose]",
      );
      if (composeButton) {
        composeButton.addEventListener("click", (e) => {
          e.preventDefault();
          this.openTemplateEditor();
        });
      }
    });
  }

  openTemplateEditor() {
    // Redirect to template editor or open modal
    window.location.href = "/email-template-editor.html";
  }

  // Export functionality for use in other modules
  getPlaceholders() {
    return this.placeholders;
  }

  getDefaultTemplates() {
    return Array.from(this.templates.values());
  }
}

// Template data structure for API responses
const TemplateSchema = {
  id: "string",
  name: "string",
  subject: "string",
  content: "string",
  signature: "string",
  attachments: "array",
  category: "string",
  isActive: "boolean",
  createdAt: "string",
  updatedAt: "string",
};

// Email job data structure
const EmailJobSchema = {
  id: "string",
  type: "string", // 'send_email', 'send_bulk', 'generate_invoice'
  status: "string", // 'queued', 'processing', 'completed', 'failed'
  data: "object",
  createdAt: "string",
  completedAt: "string",
  error: "string",
};

// API Endpoints Documentation
const APIEndpoints = {
  // Template Management
  "GET /api/templates": "Get all templates",
  "GET /api/templates/:id": "Get specific template",
  "POST /api/templates": "Create new template",
  "PUT /api/templates/:id": "Update template",
  "DELETE /api/templates/:id": "Delete template",

  // Email Operations
  "POST /api/emails/send": "Send single email",
  "POST /api/emails/send-bulk": "Send bulk emails",
  "POST /api/emails/send-test": "Send test email",

  // File Operations
  "POST /api/attachments/upload": "Upload attachment",
  "DELETE /api/attachments/:id": "Delete attachment",

  // Background Jobs
  "GET /api/jobs/:id": "Get job status",
  "GET /api/jobs": "List all jobs",
  "DELETE /api/jobs/:id": "Cancel job",
};

// Usage example for inbox-details.html integration
/*
// Add this to your inbox-details.html
<script>
    // Initialize the email template system
    const emailSystem = new EmailTemplateSystem();
    emailSystem.setupInboxIntegration();
    
    // Example: Update compose button to redirect to template editor
    document.querySelector('.compose-button').onclick = function(e) {
        e.preventDefault();
        window.location.href = '/email-template-editor.html';
    };
</script>
*/

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    EmailTemplateSystem,
    TemplateSchema,
    EmailJobSchema,
    APIEndpoints,
  };
}

// Global instance for direct HTML usage
window.EmailTemplateSystem = EmailTemplateSystem;
