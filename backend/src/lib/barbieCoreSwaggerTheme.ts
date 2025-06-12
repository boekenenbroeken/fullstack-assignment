export const barbieTheme = `
  /* GLOBAL BACKGROUND & FONT */
  .swagger-ui { 
    background-color: #fff0f5 !important; 
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif !important;
  }

  /* TOPBAR */
  .swagger-ui .topbar { 
    background: linear-gradient(90deg, #ec4899 0%, #f472b6 100%) !important;
  }

  /* TITLE */
  .swagger-ui .info h2, 
  .swagger-ui .info hgroup h1 {
    color: #ec4899 !important;
    font-weight: 700 !important;
  }

  /* VERSION BADGE */
  .swagger-ui .info .title small.version-stamp {
    background-color: #ec4899 !important;
  }

  /* OPBLOCK (global box) */
  .swagger-ui .opblock {
    background-color: #ffe4e6 !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 8px rgba(236, 72, 153, 0.1) !important;
    border: none !important;
  }

  .swagger-ui .opblock.opblock-get .opblock-summary {
    border-color: #ec4899 !important;
  }

  .swagger-ui .opblock-tag {
    background-color: #fdf2f8 !important;
    color: #ec4899 !important;
    border: none !important;
    padding: 16px !important;
    border-radius: 12px !important;
    margin-bottom: 12px !important;
  }

  .swagger-ui .info .title small {
    background-color: #ec4899 !important;
  }

  .swagger-ui .opblock.opblock-get .opblock-summary-method {
    background-color: #ec4899 !important;
  }

  /* EXECUTE BUTTON */
  .swagger-ui .btn.execute {
    background-color: #f472b6 !important;
    border-color: #f472b6 !important;
    box-shadow: 0 4px 10px rgba(244, 114, 182, 0.4) !important;
    border-radius: 12px !important;
  }

  /* PARAMETERS SECTION */
  .swagger-ui .parameters-header {
    background-color: #ffe4e6 !important;
    padding: 16px !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 10px rgba(236, 72, 153, 0.1) !important;
    border: 1px solid #f472b6 !important;
    margin-bottom: 16px !important;
  }

  .swagger-ui .parameters-header h4 {
    color: #ec4899 !important;
    font-weight: 700 !important;
    font-size: 1.2rem !important;
  }

  .swagger-ui .parameters-header .btn {
    background-color: #ec4899 !important;
    color: #fff !important;
    font-weight: 700 !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3) !important;
  }

  .swagger-ui .parameters-header .btn:hover {
    background-color: #db2777 !important;
  }

  .swagger-ui .parameters-container {
    background-color: #fff5f7 !important;
    border-radius: 12px !important;
    padding: 16px !important;
    box-shadow: 0 2px 6px rgba(236, 72, 153, 0.1) !important;
    border: 1px solid #f472b6 !important;
  }

  /* TRY IT OUT BUTTON */
  .swagger-ui .btn.try-out__btn {
    background-color: #ec4899 !important;
    border-color: #ec4899 !important;
    color: white !important;
    font-weight: 600 !important;
    border-radius: 12px !important;
    box-shadow: 0 2px 6px rgba(236, 72, 153, 0.3) !important;
  }

  .swagger-ui .btn.try-out__btn:hover {
    background-color: #db2777 !important;
  }

  /* CLEAR BUTTON */
  .swagger-ui .btn-clear {
    background-color: transparent !important;
    border: 2px solid #f472b6 !important;
    color: #f472b6 !important;
    font-weight: 600 !important;
    border-radius: 12px !important;
    padding: 8px 16px !important;
    transition: all 0.2s ease-in-out !important;
  }

  .swagger-ui .btn-clear:hover {
    background-color: #fdf2f8 !important;
    border-color: #ec4899 !important;
    color: #ec4899 !important;
  }

  .swagger-ui .btn-group {
    gap: 10px;
  }

  /* RESPONSE SECTION */
  .swagger-ui .responses-wrapper {
    background-color: #fff5f7 !important;
    border-radius: 12px !important;
    border: 1px solid #f472b6 !important;
    box-shadow: 0 2px 6px rgba(236, 72, 153, 0.1) !important;
    padding: 16px !important;
  }

  .swagger-ui .responses-inner h4 {
    color: #ec4899 !important;
    font-weight: 600 !important;
  }

  .swagger-ui .opblock .opblock-section-header {
    background-color: #ffe4e6 !important;
    padding: 16px !important;
    border-radius: 12px !important;
    border: 1px solid #f472b6 !important;
    box-shadow: 0 4px 10px rgba(236, 72, 153, 0.1) !important;
    margin-bottom: 16px !important;
  }

  .swagger-ui .opblock .opblock-section-header h4 {
    color: #ec4899 !important;
    font-weight: 700 !important;
    font-size: 1.2rem !important;
  }

  /* ACTIVE TAB BAR */
  .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span:after {
    background-color: #ec4899 !important;
  }

  /* MODEL SCHEMAS */
  .swagger-ui .models {
    background-color: #fff0f5 !important;
    border-radius: 12px !important;
    padding: 16px !important;
  }

  .swagger-ui .model-title {
    color: #ec4899 !important;
    font-weight: 600 !important;
    font-size: 1.1rem !important;
  }

  /* REQUEST URL */
  .swagger-ui .request-url {
    background-color: #fff5f7 !important;
    border: 1px solid #f472b6 !important;
    border-radius: 6px !important;
  }

  /* ARROWS */
  .swagger-ui .arrow {
    border-color: #ec4899 !important;
  }

  /* GENERAL BUTTON RADIUS */
  .swagger-ui .btn {
    border-radius: 12px !important;
  }

  /* RESPONSE ACCEPT DROPDOWN */
  .swagger-ui .response-control-media-type--accept-controller select {
    border-color: #ec4899 !important;
  }

  .swagger-ui .response-control-media-type__accept-message {
    color: #ec4899 !important;
  }
`;
