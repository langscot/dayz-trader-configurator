
/**
 * Represents a <Trader> entry from a TraderConfig.txt File
 */
export default class TraderEntry
{
    // Raw string of the config
    rawEntry;
    
    // Name of item / class name
    className;

    // Amount of item. Can be a number or classifier, e.g *, M=Magazine, V=Vehicle, etc.
    quantity;

    // Price of buy
    buyPrice;

    // Price of sell
    sellPrice;

    // An array of errors with this entry
    errors = [];

    /**
     * Instantiates the object using the raw entry text file config
     * 
     * @param { string | null } rawEntry Provide a config for this entry, or, create a new empty entry
     */
    constructor( rawEntry = null, order = null )
    {
        this.rawEntry = rawEntry;
        this.order = order;

        this.loadValues();
    }

    /**
     * Extracts values from an entry config txt
     * 
     * @return { string }
     */
    loadValues()
    {
        let values = this.rawEntry.split( "," );

        try {
            this.className = values[0].trim();
            this.quantity = values[1].trim();
            this.buyPrice = parseInt( values[2] ) || null;
            this.sellPrice = parseInt( values[3] ) || null;

            this.errorCheck();
        }
        catch ( exception )
        {
            return false;
        }
    }

    /**
     * Checks for any erorrs within the entry value, e.g sellPrice > buyPrice
     */
    errorCheck()
    {
        // Guard clause for if this entry is a comment
        if (this.className.startsWith('//')) return;
        
        // Ensure sell Price is lower than buy Price
        if ((this.sellPrice > this.buyPrice) && (this.sellPrice > -1 && this.buyPrice > -1)) {
            this.errors.push('Sell price is higher than buy price.');
        }

        // Ensure quantity matches a valid value
        if (!this.quantity.match(/(\*|V|S|M|VNK|W|K|[-0-9])/g)) {
            this.errors.push('Quantity is not a valid value.');
        }
    }

    /**
     * Formats an entry object
     * 
     * @param { object } entry 
     */
    static formatEntry( entry )
    {
        // Skip this entry if null values exist
        if ( 
            ( 
                entry.className === null || 
                entry.className.trim().length === 0 
            ) ||
            entry.quantity === null ||
            entry.buyPrice === null ||
            entry.sellPrice === null
        ) return false;
        
        return "\t\t" + entry.className + ",\t" + entry.quantity + ",\t" + entry.buyPrice + ",\t" + entry.sellPrice
    }
}