# Gnomebed
A jQuery plugin for rendering embedded media via the Noembed gateway.

##Installation & Usage

1. Download and unzip the package into your js directory.
2. Link to js/jquery.gnomebed.min.js
3. Call the plugin by attaching it to a selector. The plugin uses the URL in the selector or html tag attribute to fetch an embedded player via the Noembed gateway.
 

####Options

| Option | Description | Default | Options
| --- | --- | --- | --- |
| mode | Append, prepend, or replace selector with player? | replace | append, prepend, replace
| attr | Look for the URL in a tag attribute or wrapped text? | text | text, any attribute such as href, data-url, etc.
| nowrap | Remove Noembed footer? | on | on, off
| maxwidth | maximum width of returned player | 800 | any integer
| maxheight | maximum height of returned player | 450 | any integer,
| youtube | Add YouTube player options for a customized YouTube player | {showinfo: 1, controls: 1, rel: 1, autoplay: 0} |  {showinfo: 1, controls: 1, rel: 1, autoplay: 0}
| vimeo | Add Vimeo player options for a customized Vimeo player | {autopause: 1, autoplay: 1, badge: 1, byline: 1, color: 'ffcc00', loop: 0} |  

#####Examples

Extract URL from text wrapped in a selector:

```
<div class="video">
	<div class="video-wrapper">https://vimeo.com/92473148</a></div>
</div>

<script type="text/javascript" src="js/jquery.gnomebed.min.js"></script>
<script>
	(function($){
		$('.video-wrapper').gnomebed();
	})(jQuery)
</script>
```

Use a tag attribute to pass the URL:

```
<div class="video">
	<div class="video-wrapper">
	<a href="https://www.youtube.com/watch?v=W9Sk01P232s">https://www.youtube.com/watch?v=W9Sk01P232s</a>
	</div>
</div>

<script type="text/javascript" src="js/jquery.gnomebed.min.js"></script>
<script>
	(function($){
		$('.video-wrapper a').gnomebed({attr:'href'});
	})(jQuery)
</script>
```

####Notes

So far, only tested YouTube, Vimeo, and SoundCloud URLs with this repo. Limits to the maxwidth and maxheight options will vary by provider. See [noembed.com](http://noembed.com) for providers the Noembed project currently supports.