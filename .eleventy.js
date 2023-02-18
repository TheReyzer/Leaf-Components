module.exports = function(eleventyConfig) {
	// Input Directory : src Output directory: _site
	
	// Copy `files` to `_site/`
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy({"src/favicon": "/"});
    
	return {
        dir: { input: 'src', output: '_site' }
    };
};
