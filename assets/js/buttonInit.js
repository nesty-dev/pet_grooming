/**
 * Button Initialization Script for PawSpa
 *
 * This script initializes all buttons on the page using the PawButton component system.
 * It replaces existing buttons with reusable, configurable components.
 */

// Constants
const ELEMENT_IDS = {
  CONTACT_SECTION: "contact",
  SERVICES_SECTION: "services",
  SERVICE_SELECT: "service",
};

const REQUIRED_FORM_FIELDS = [
  "owner-name",
  "pet-name",
  "phone",
  "preferred-date",
];

const LOADING_CONFIG = {
  TEXT: "Submitting...",
  DELAY: 2000,
  SUCCESS_MESSAGE:
    "Appointment request submitted successfully! We will contact you soon.",
};

/**
 * Smoothly scrolls to a target element
 * @param {string} elementId - ID of the target element
 */
const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Validates form data and returns missing required fields
 * @param {FormData} formData - Form data to validate
 * @returns {string[]} Array of missing field names
 */
const validateFormData = (formData) => {
  return REQUIRED_FORM_FIELDS.filter((field) => !formData.get(field));
};

/**
 * Sets button loading state
 * @param {HTMLButtonElement} button - Button element
 * @param {boolean} isLoading - Whether to show loading state
 * @param {string} originalLabel - Original button text
 */
const setButtonLoadingState = (button, isLoading, originalLabel = null) => {
  if (isLoading) {
    button.textContent = LOADING_CONFIG.TEXT;
    button.disabled = true;
    button.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    button.textContent = originalLabel;
    button.disabled = false;
    button.classList.remove("opacity-50", "cursor-not-allowed");
  }
};

/**
 * Handles form submission with validation and loading states
 * @param {Event} event - Form submit event
 */
const handleFormSubmission = (event) => {
  event.preventDefault();

  const form = event.target.closest("form");
  const formData = new FormData(form);
  const missingFields = validateFormData(formData);

  if (missingFields.length > 0) {
    alert(
      `Please fill in the following required fields: ${missingFields.join(
        ", "
      )}`
    );
    return;
  }

  const button = event.target;
  const originalLabel = button.textContent;

  setButtonLoadingState(button, true);

  // Simulate API call
  setTimeout(() => {
    alert(LOADING_CONFIG.SUCCESS_MESSAGE);
    form.reset();
    setButtonLoadingState(button, false, originalLabel);
  }, LOADING_CONFIG.DELAY);
};

// Button configurations for different sections of the site
const buttonConfigs = {
  headerBookBtn: {
    label: "Book Now",
    variant: "primary",
    size: "medium",
    onClick: () => scrollToElement(ELEMENT_IDS.CONTACT_SECTION),
  },

  heroScheduleBtn: {
    label: "Schedule Appointment",
    variant: "primary",
    size: "large",
    onClick: () => scrollToElement(ELEMENT_IDS.CONTACT_SECTION),
  },

  heroServicesBtn: {
    label: "View Services",
    variant: "secondary",
    size: "large",
    onClick: () => scrollToElement(ELEMENT_IDS.SERVICES_SECTION),
  },

  submitFormBtn: {
    label: "Submit Appointment Request",
    variant: "submit",
    size: "large",
    fullWidth: true,
    type: "submit",
    onClick: handleFormSubmission,
  },
};

/**
 * Button selector mappings for initialization
 */
const BUTTON_SELECTORS = {
  HEADER_BOOK: "#header-book-btn",
  HERO_SCHEDULE: "#hero-schedule-btn",
  HERO_SERVICES: "#hero-services-btn",
  SUBMIT_FORM: "#submit-form-btn",
};

/**
 * Pre-selects a service in the contact form
 * @param {string} serviceName - Name of the service to select
 */
const preselectService = (serviceName) => {
  const serviceSelect = document.getElementById(ELEMENT_IDS.SERVICE_SELECT);
  if (!serviceSelect) return;

  // Map service names to option values
  const serviceMap = {
    "full grooming": "full-grooming",
    "bath & brush": "bath-brush",
    "bath and brush": "bath-brush",
    "nail care": "nail-care",
    "dental care": "dental-care",
    "flea treatment": "flea-treatment",
    "premium spa": "premium-spa",
  };

  const serviceKey = serviceName.toLowerCase();
  const serviceValue = serviceMap[serviceKey];

  if (serviceValue) {
    serviceSelect.value = serviceValue;
  }
};

/**
 * Handles service booking interaction
 * @param {string} serviceName - Name of the service
 * @param {string} price - Price of the service
 */
const handleServiceBooking = (serviceName, price) => {
  scrollToElement(ELEMENT_IDS.CONTACT_SECTION);

  // Delay to allow smooth scroll to complete
  setTimeout(() => preselectService(serviceName), 500);

  alert(`Booking ${serviceName} (${price}). Please fill out the form below.`);
};

/**
 * Initialize all buttons when DOM is ready
 */
const initializeButtons = () => {
  const buttonMappings = [
    {
      selector: BUTTON_SELECTORS.HEADER_BOOK,
      config: buttonConfigs.headerBookBtn,
    },
    {
      selector: BUTTON_SELECTORS.HERO_SCHEDULE,
      config: buttonConfigs.heroScheduleBtn,
    },
    {
      selector: BUTTON_SELECTORS.HERO_SERVICES,
      config: buttonConfigs.heroServicesBtn,
    },
    {
      selector: BUTTON_SELECTORS.SUBMIT_FORM,
      config: buttonConfigs.submitFormBtn,
    },
  ];

  buttonMappings.forEach(({ selector, config }) => {
    replacePawButton(selector, config);
  });

  console.log("PawSpa buttons initialized successfully!");
};

/**
 * Creates a booking button for service cards
 * @param {string} serviceName - Name of the service
 * @param {string} price - Price of the service
 * @returns {PawButton} Configured booking button
 */
const createServiceBookingButton = (serviceName, price) => {
  if (!serviceName || !price) {
    throw new Error("Service name and price are required");
  }

  return createPawButton({
    label: "Book Service",
    variant: "outline",
    size: "small",
    onClick: () => handleServiceBooking(serviceName, price),
  });
};

// Initialize buttons when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeButtons);

// Export public API
const ButtonInitializer = {
  initialize: initializeButtons,
  createServiceButton: createServiceBookingButton,
  scrollToElement,
  configs: buttonConfigs,
};

// Make available globally for backward compatibility
window.ButtonInitializer = ButtonInitializer;
window.initializeButtons = initializeButtons;
window.createServiceBookingButton = createServiceBookingButton;
