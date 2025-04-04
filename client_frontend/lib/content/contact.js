export const contactContent = {
    section: {
      title: "Contact Us",
      subtitle: "Let's Connect",
      description: "Got questions, ideas, or just want to chat about your next project? Send us a message and we’ll get back to you shortly."
    },
    form: {
      inputs: [
        { name: "name", placeholder: "Your Name", type: "text", required: true },
        { name: "email", placeholder: "Your Email", type: "email", required: true }
      ],
      textarea: {
        name: "message",
        placeholder: "Your Message",
        rows: 5,
        required: true
      },
      button: {
        text: "Send Message",
        link: "/api/sendmail" // API endpoint to handle form submission
      }
    },
    responseMessages: {
      success: "✅ Message sent successfully!",
      error: "❌ Something went wrong. Please try again."
    },
    redirect: {
      success: {
        text: "Return Home",
        link: "/" // Redirects to the home page upon successful message submission
      }
    }
  };
  