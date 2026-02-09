/**
 * Configuration module for WhatsApp Desktop Client
 *
 * Centralizes application settings and constants.
 * @author Waseem Akram (@evildevill)
 */

const config = {
    /**
     * User agent string for WhatsApp Web compatibility
     * Mimics Chrome on Linux for optimal experience
     */
    userAgent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`,

    /**
     * Chrome-specific user agent for certain operations
     */
    chromeUserAgent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`,

    /**
     * Application metadata
     */
    app: {
        name: 'WhatsApp Desktop Client',
        version: '1.2.0',
        author: 'Waseem Akram',
        repository: 'https://github.com/evildevill/whatsapp-desktop-linux'
    },

    /**
     * Window default settings
     */
    window: {
        defaultWidth: 800,
        defaultHeight: 600,
        minWidth: 400,
        minHeight: 300
    },

    /**
     * WhatsApp Web URL
     */
    whatsappUrl: 'https://web.whatsapp.com'
};

export { config }; 
