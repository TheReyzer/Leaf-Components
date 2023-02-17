module.exports = function(eleventyConfig) {
	// Input Directory : src Output directory: _site
	
	// Copy `files` to `_site/`
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy({"favicon": "/"});
    
	return {
        dir: { input: 'src', output: '_site' }
    };
};
