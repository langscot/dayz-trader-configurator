import TraderEntry from './TraderEntry';

import TraderConfig from './TraderConfig';

/**
 * Represents a <Category> extract from TraderConfig.txt file
 * 
 * @author Matthew Lang
 */
export default class TraderCategory
{
    // Raw string of the category config extract
    rawCategory;

    // Name of category
    categoryName;

    /**
     * An array of TraderEntries
     * @param { TraderEntry[] }
     */
    entries = [];

    /**
     * Instantiates the object using the raw category text file config
     * 
     * @param { string | null } rawCategory 
     */
    constructor( rawCategory = null )
    {
        if (rawCategory) {
            this.rawCategory = rawCategory;

            // Extract name of category using a RegExp
            this.categoryName = rawCategory.match( /(?:<Category>)([a-zA-Z |()]*)/ )[1]

            this.entries = TraderCategory.loadEntries(rawCategory);
        }
    }

    /**
     * Creates a new category from the application rather than config txt
     * 
     * @param { string } categoryName 
     */
    static create( categoryName ) 
    {
        let category = new TraderCategory();
        category.categoryName = categoryName
        return category;
    }

    /**
     * Extracts TraderEntry objects from raw config string
     * 
     * @param { string } rawCategory 
     * @return { TraderEntry[] }
     */
    static loadEntries( rawCategory )
    {
        let matches = rawCategory.match(/(.*)\n/g);

        // Remove whitespace from each match
        matches.map( match => match.trim() );

        // Filter out empty values or <Category> headers
        matches = matches.filter( match => {

            if ( 
                match.length < 2 || 
                (
                    match.length > 0 &&
                    match.startsWith( "<" )
                )
            ) return false;

            return true;
        } )

        return matches.map( match => new TraderEntry( match ) );
    }

    /**
     * Generates a string formatted for TraderConfig.txt using the currently loaded TraderEntries
     * 
     * @return { string }
     */
    formatCategory()
    {
        let sortData = TraderConfig.sortEntriesBy.split(" ");

        if (sortData[0] === 'asc') {
            this.entries = this.entries.sort((a, b) => {
                return a[sortData[1]] - b[sortData[1]];
            });
        } else {
            this.entries = this.entries.sort((a, b) => {
                return b[sortData[1]] - a[sortData[1]];
            });
        }
        
        let formattedEntries = this.entries.map ( entry => TraderEntry.formatEntry(entry) )
            .filter(entry => !!entry)
            .join( "\n" );

        return "\t<Category> " + this.categoryName + "\n" + formattedEntries;
    }
}