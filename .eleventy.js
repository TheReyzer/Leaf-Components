module.exports = function(eleventyConfig) {
	// Input Directory : src Output directory: _site
	
	// Copy `style.css` to `_site/`
    eleventyConfig.addPassthroughCopy("style.css");
    
	return {
        dir: { 
            input: 'src', 
            output: '_site'
        }
    };
};