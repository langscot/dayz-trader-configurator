import TraderCategory from './TraderCategory';

/**
 * Represents a <Trader> extract from a TraderConfig.txt File
 * 
 * @author Matthew Lang
 */
export default class TraderType
{
    // Raw string of the config
    rawType;

    // Name of the Trader
    typeName;

    /**
     * Array of TraderCategories that exist in this trader config extract
     * @param { TraderCategories[] }
     */
    categories = [];

    /**
     * Instantiates the object using the raw type text file config
     * 
     * @param { string | null } rawType 
     */
    constructor( rawType = null )
    {
        if ( rawType ) {
            this.rawType = rawType;

            // Extract typeName from raw config using RegExp
            this.typeName = rawType.match( /(?:<Trader>)([a-zA-Z |()]*)/ )[1];
    
            this.categories = TraderType.loadCategories(rawType);
        }
    }

    static create( traderName ) 
    {
        let trader = new TraderType();
        trader.typeName = traderName;
        return trader;
    }

    /**
     * Extracts TraderCategory objects from raw config string
     * 
     * @param { string } rawType 
     * @return { TraderCategory[] }
     */
    static loadCategories( rawType )
    {
        let matches = rawType.match( /(?:<Category>)((?:.|\n)*?)(?=<Trader>|<Category>|<FileEnd>|$)/g )

        return matches.map( match => new TraderCategory( match ) );
    }

    /**
     * Generates a string formatted for TraderConfig.txt using the currently loaded TraderCategories
     * 
     * @return { string }
     */
    formatType()
    {
        let formattedCategories = this.categories.map( category => category.formatCategory() ).join( "\n" );

        return "<Trader> " + this.typeName + "\n" + formattedCategories;
    }

    /**
     * Creates a new category in this trader
     * 
     * @param { string } categoryName
     * @return { bool }
     */
    createCategory( categoryName ) {
        this.categories.push( new TraderCategory.create( categoryName ) );
    }

    /**
     * Deletes a category at specified categroy id (index) in this Trader 
     *
     * @param { number } categoryId 
     */
    deleteCategory( categoryId ) {
        this.categories.splice( categoryId, 1 );
    }
}