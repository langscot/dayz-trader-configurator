import TraderType from './TraderType';

/**
 * Represents a TraderConfig.txt File
 * 
 * @author Matthew Lang
 */
export default class TraderConfig
{
    // The raw string of this trader config
    rawConfig;

    // An array of trader types
    types = [];

    // What to sort entries by
    static sortEntriesBy = 'asc buyPrice';

    /**
     * Instantiates the object using the raw text file config
     * 
     * @param { string } rawConfig 
     */
    constructor( rawConfig = null )
    {
        if (rawConfig) {
            this.rawConfig = rawConfig;

            this.types = TraderConfig.loadTraderTypes( rawConfig );
        }
    }

    /**
     * Creates a trader from within the application instead of
     * from a text config file
     * 
     * @param { string } traderName 
     */
    createTrader( traderName ) {
        this.types.push( TraderType.create( traderName ) )
    }

    /**
     * Deletes a trader with the specified id (index)
     * 
     * @param { number } typeId 
     */
    deleteTrader( typeId ) {
        this.types.splice( typeId, 1 );
    }

    /**
     * Extracts TraderType classes from a raw config string
     * 
     * @param { string } rawConfig
     * @return { TraderType[] } An array of trader types
     */
    static loadTraderTypes( rawConfig )
    {
        let matches = rawConfig.match(/(?:<Trader>)((?:.|\n)*?)(?=<Trader>|<FileEnd>)/g);
        return matches.map( match => new TraderType( match ) );
    }

    /**
     * Extracts the head of the trader config string
     * 
     * @param { string } rawConfig 
     */
    static extractConfigHead( rawConfig )
    {
        return rawConfig.substring( 0, rawConfig.indexOf( "<Trader>" ) )
    }

    /**
     * Generates a string formatted for TraderConfig.txt using the currently loaded TraderTypes
     * 
     * @return { string }
     */
    formatConfig()
    {
        let formattedTypes = this.types.map( type => type.formatType() ).join( "\n" );

        return TraderConfig.extractConfigHead( this.rawConfig ) 
            + formattedTypes
            + "<FileEnd>";
    }
}