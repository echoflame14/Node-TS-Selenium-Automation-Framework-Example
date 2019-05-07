export default {
  entryFields: {
    usernameInput: {
      xpath: "//input[@id='okta-signin-username']"
    },
    passwordInput: {
      xpath: "//input[@id='okta-signin-password']"
    },
    rememberMeCheckbox: {
      xpath: "//input[@id='input55' ][@name='remember']"
    }
  },
  buttons: {
    loginBtn: {
      xpath: "//input[@id='okta-signin-submit']"
    },
    needHelpSigningInBtn: {
      xpath: "//a[@class='link help js-help']"
    }
  },
  links: {
    hiddenHelpLinks: {
      container: {
        xpath: "//ul[@class='help-links js-help-links']"
      },
      // Hidden until the "Need help signing in?" button is clicked
      forgotPasswordLink: {
        xpath: "//a[@class='link js-forgot-password']"
      },
      helpLink: {
        xpath: "//a[@class='link js-help-link']"
      }
    }
  },
  validationErrorMessaging: {
    errorsFoundSection: {
      attentionIcon: {
        xpath: "//span[@class='icon error-16']"
      },
      errorMessage: {
        xpath:
          "//div[@class='okta-form-infobox-error infobox infobox-error']//p"
      }
    },
    usernameNotProvidedErrorSection: {
      attentionIcon: {
        xpath: "//p[contains(text(),'Please enter a username')]/span"
      },
      errorMessage: {
        xpath: "//p[contains(text(),'Please enter a username')]"
      }
    },
    passwordNotProvidedSection: {
      attentionIcon: {
        xpath: "//p[contains(text(),'Please enter a password')]/span"
      },
      errorMessage: {
        xpath: "//p[contains(text(),'Please enter a password')]"
      }
    }
  }
};
