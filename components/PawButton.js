/**
 * PawButton - Reusable Button Component for PawSpa
 *
 * A flexible button component that supports various styles, sizes, and behaviors
 * while maintaining consistency with the PawSpa design system.
 */

// Constants for better maintainability
const BUTTON_DEFAULTS = {
  LABEL: "Button",
  VARIANT: "primary",
  SIZE: "medium",
  TYPE: "button",
  DISABLED: false,
  FULL_WIDTH: false,
};

const STYLE_VARIANTS = {
  primary: "bg-pet-orange text-white hover:bg-orange-600 focus:ring-pet-orange",
  secondary:
    "border-2 border-white text-white hover:bg-white hover:text-pet-blue focus:ring-white",
  outline:
    "border-2 border-pet-orange text-pet-orange hover:bg-pet-orange hover:text-white focus:ring-pet-orange",
  ghost:
    "text-pet-orange hover:bg-pet-orange hover:text-white focus:ring-pet-orange",
  submit: "bg-pet-orange text-white hover:bg-orange-600 focus:ring-pet-orange",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
};

const SIZE_STYLES = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-8 py-3 text-lg",
};

const BASE_STYLES =
  "rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 inline-flex items-center justify-center";

class PawButton {
  /**
   * Create a new PawButton instance
   * @param {Object} options - Configuration options for the button
   * @param {string} options.label - Button text content
   * @param {string} options.variant - Button style variant
   * @param {string} options.size - Button size
   * @param {Function} options.onClick - Click event handler
   * @param {boolean} options.disabled - Whether button is disabled
   * @param {boolean} options.fullWidth - Whether button should take full width
   * @param {string} options.className - Additional CSS classes
   * @param {string} options.type - Button type attribute
   * @param {string} options.id - Button ID attribute
   */
  constructor(options = {}) {
    this._validateOptions(options);

    this.label = options.label || BUTTON_DEFAULTS.LABEL;
    this.variant = options.variant || BUTTON_DEFAULTS.VARIANT;
    this.size = options.size || BUTTON_DEFAULTS.SIZE;
    this.onClick = options.onClick || this._defaultClickHandler;
    this.disabled = options.disabled || BUTTON_DEFAULTS.DISABLED;
    this.fullWidth = options.fullWidth || BUTTON_DEFAULTS.FULL_WIDTH;
    this.className = options.className || "";
    this.type = options.type || BUTTON_DEFAULTS.TYPE;
    this.id = options.id || null;
  }

  /**
   * Validates constructor options
   * @param {Object} options - Options to validate
   * @private
   */
  _validateOptions(options) {
    if (options.variant && !STYLE_VARIANTS[options.variant]) {
      console.warn(`Invalid variant "${options.variant}". Using default.`);
    }

    if (options.size && !SIZE_STYLES[options.size]) {
      console.warn(`Invalid size "${options.size}". Using default.`);
    }
  }

  /**
   * Default click handler (no-op)
   * @private
   */
  _defaultClickHandler() {
    // Intentionally empty - no default action
  }

  /**
   * Get CSS classes for button variants
   * @returns {string} Variant-specific CSS classes
   */
  getVariantStyles() {
    return STYLE_VARIANTS[this.variant] || STYLE_VARIANTS.primary;
  }

  /**
   * Get CSS classes for button sizes
   * @returns {string} Size-specific CSS classes
   */
  getSizeStyles() {
    return SIZE_STYLES[this.size] || SIZE_STYLES.medium;
  }

  /**
   * Get base CSS classes that apply to all buttons
   * @returns {string} Base CSS classes
   */
  getBaseStyles() {
    return BASE_STYLES;
  }

  /**
   * Get conditional CSS classes based on button state
   * @returns {Object} Object containing conditional styles
   * @private
   */
  _getConditionalStyles() {
    return {
      width: this.fullWidth ? "w-full" : "",
      state: this.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    };
  }

  /**
   * Get all CSS classes for the button
   * @returns {string} Complete CSS class string
   */
  getAllStyles() {
    const conditionalStyles = this._getConditionalStyles();

    const styleArray = [
      this.getBaseStyles(),
      this.getVariantStyles(),
      this.getSizeStyles(),
      conditionalStyles.width,
      conditionalStyles.state,
      this.className,
    ];

    return styleArray.filter(Boolean).join(" ");
  }

  /**
   * Generate button attributes object
   * @returns {Object} Object containing button attributes
   * @private
   */
  _getButtonAttributes() {
    const attributes = {
      type: this.type,
      class: this.getAllStyles(),
    };

    if (this.id) {
      attributes.id = this.id;
    }

    if (this.disabled) {
      attributes.disabled = true;
    }

    return attributes;
  }

  /**
   * Generate button HTML string
   * @returns {string} Button HTML
   */
  render() {
    const attributes = this._getButtonAttributes();
    const attributeString = Object.entries(attributes)
      .map(([key, value]) => {
        if (value === true) return key;
        return `${key}="${value}"`;
      })
      .join(" ");

    return `<button ${attributeString}>${this.label}</button>`;
  }

  /**
   * Create and return DOM element
   * @returns {HTMLButtonElement} Button DOM element
   */
  createElement() {
    const button = document.createElement("button");
    const attributes = this._getButtonAttributes();

    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (value === true) {
        button.setAttribute(key, "");
      } else {
        button.setAttribute(key, value);
      }
    });

    button.textContent = this.label;

    // Attach event handler
    if (this.onClick && !this.disabled) {
      button.addEventListener("click", this.onClick);
    }

    return button;
  }

  /**
   * Update button properties and validate new options
   * @param {Object} newOptions - New configuration options
   */
  update(newOptions = {}) {
    this._validateOptions(newOptions);
    Object.assign(this, newOptions);
  }

  /**
   * Check if button has a specific variant
   * @param {string} variant - Variant to check
   * @returns {boolean} True if button has the specified variant
   */
  hasVariant(variant) {
    return this.variant === variant;
  }

  /**
   * Enable or disable the button
   * @param {boolean} disabled - Whether to disable the button
   */
  setDisabled(disabled) {
    this.disabled = disabled;
  }
}

/**
 * Utility Functions for PawButton Management
 */

/**
 * Factory function to create a new PawButton
 * @param {Object} options - Button configuration options
 * @returns {PawButton} New PawButton instance
 * @throws {Error} If options are invalid
 */
const createPawButton = (options = {}) => {
  try {
    return new PawButton(options);
  } catch (error) {
    console.error("Failed to create PawButton:", error);
    throw error;
  }
};

/**
 * Safely query for DOM element with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} Found element or null
 * @private
 */
const _safeQuerySelector = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return null;
  }
};

/**
 * Replace an existing button element with a PawButton
 * @param {string} selector - CSS selector for the element to replace
 * @param {Object} buttonOptions - PawButton configuration options
 * @returns {PawButton|null} The created PawButton or null if element not found
 */
const replacePawButton = (selector, buttonOptions) => {
  if (!selector || !buttonOptions) {
    console.error("replacePawButton requires selector and buttonOptions");
    return null;
  }

  const existingElement = _safeQuerySelector(selector);
  if (!existingElement) {
    console.warn(`Element not found for selector: ${selector}`);
    return null;
  }

  try {
    const newButton = createPawButton(buttonOptions);
    const newElement = newButton.createElement();

    // Preserve original ID if it exists and wasn't specified in options
    if (existingElement.id && !buttonOptions.id) {
      newElement.id = existingElement.id;
    }

    existingElement.parentNode.replaceChild(newElement, existingElement);
    return newButton;
  } catch (error) {
    console.error("Failed to replace button:", error);
    return null;
  }
};

/**
 * Create multiple buttons and append them to a container
 * @param {string} containerSelector - CSS selector for the container element
 * @param {Array} buttonsConfig - Array of button configuration objects
 * @param {boolean} replace - Whether to replace container content or append
 * @returns {PawButton[]} Array of created buttons
 */
const createButtonGroup = (
  containerSelector,
  buttonsConfig = [],
  replace = false
) => {
  if (!containerSelector || !Array.isArray(buttonsConfig)) {
    console.error(
      "createButtonGroup requires valid containerSelector and buttonsConfig array"
    );
    return [];
  }

  const container = _safeQuerySelector(containerSelector);
  if (!container) {
    console.warn(`Container not found for selector: ${containerSelector}`);
    return [];
  }

  if (replace) {
    container.innerHTML = "";
  }

  const createdButtons = [];

  buttonsConfig.forEach((config, index) => {
    try {
      const button = createPawButton(config);
      const element = button.createElement();
      container.appendChild(element);
      createdButtons.push(button);
    } catch (error) {
      console.error(`Failed to create button at index ${index}:`, error);
    }
  });

  return createdButtons;
};

/**
 * Public API Export
 */
const PawButtonAPI = {
  PawButton,
  createPawButton,
  replacePawButton,
  createButtonGroup,

  // Utility methods
  isValidVariant: (variant) => variant in STYLE_VARIANTS,
  isValidSize: (size) => size in SIZE_STYLES,
  getAvailableVariants: () => Object.keys(STYLE_VARIANTS),
  getAvailableSizes: () => Object.keys(SIZE_STYLES),
};

// Export for use in other scripts (if using modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = PawButtonAPI;
}

// Make available globally with clean namespace
window.PawButtonAPI = PawButtonAPI;

// Maintain backward compatibility
window.PawButton = PawButton;
window.createPawButton = createPawButton;
window.replacePawButton = replacePawButton;
window.createButtonGroup = createButtonGroup;
