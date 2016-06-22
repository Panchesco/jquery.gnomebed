/*

Author:         Richard Whitmer
URL:            https://github.com/panchesco	
Name:           Gnomebed	
Description:    jQuery plugin for rendering embedded media via the Noembed gateway.
Version:        1.1.1

The MIT License (MIT)

Copyright (c) 2016 Richard Whitmer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


	(function(jQuery){

		$.fn.gnomebed = function(options) {
		
			var settings = $.extend({

		    // These are the default settings.
		    mode: 'replace',
		    attr: 'text',
		    nowrap: 'on',
		    maxwidth: 800,
		    maxheight: 450,
		    youtube: {	showinfo: 1,
			    		controls: 1,
			    		rel: 1,
			    		autoplay: 0,
		    },
		    youtubeOpts: ['showinfo',
		    				'controls',
		    				'rel',
		    				'autoplay',
		    				'vq']
		  }, options);
		  
		  
		  /**
		   * Replace the target with the returned player.
		   */
		  function loadPlayer(html, target) {

		    switch (settings.mode) {

		      case 'append':
		        $(target).append(html);
		        break;

		      case 'prepend':
		        $(target).prepend(html);
		        break;

		      default:
		        $(target).html(html);
		    }

		  }

		  /*****************************************************************/
		  
		/**
		* Figure out who the provider is from the URL.
		* @param url string
		* @return string
		*/
		provider = function(url)
		{
			
			if(url.search(/soundcl/i)!=-1){
				return 'soundcloud';
			};
			
			if(url.search(/vimeo/i)!=-1){
				return 'vimeo';
			};
			
			if(url.search(/YouTu/i)!=-1){
				return 'youtube';
			};
			
			return 'unknown';
			
		}
		
		/*****************************************************************/
		  
		  /**
			  * Get the current url.
			  * @param sel object
			  * @return string
			  */
		function getUrl(sel) {
		
			switch(settings.attr)
		    {
			   
			   case 'text':
			    return $(sel).text().trim();
			    break;
			   
			   default:  
			   return $(sel).attr(settings.attr);
			    
		    }

		}

		  /**
		   * Request embed from noembed gateway.
		   */
		  $(this).each(function() {
		    
		   url = getUrl(this);
		   
		   p = provider(url);
		   
		   if (settings.nowrap == 'on') {
		      url = url + '&nowrap=' + settings.nowrap;
		    }

		    if (settings.maxwidth != undefined) {
		      url = url + '&maxwidth=' + settings.maxwidth;
		    }

		    if (settings.maxheight != undefined) {
		      url = url + '&maxheight=' + settings.maxheight;
		    }
		    
		    

		    endpoint = 'http://noembed.com/embed?url=' + url;

		    var target = $(this);
		    
		    
		    switch(p) {
		    
			    
			    case 'youtube':
			    loadPlayer(youTubePlayer(url), target);
			    break;
			    
			    default: 
			    $.ajax({
		        method: 'GET',
		        url: endpoint,
		        dataType: 'json'
		      })
		      .done(function(data) {
		        loadPlayer(data.html, target);
		      });
		      
		   }

		    
		  });

		  /*****************************************************************/
		  
		  
		  /**
			* Get YouTube video id from URL.
			* @param url string
			* @return string
			*/
			function youTubeId(url){
				
				var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
				if(videoid != null) {
				return videoid[1];
				} else {
					return null;
				}
			}
			
		  
		  /**
			* Return a YouTube player.
			* @param url string
			* @return string
			*/
			function youTubePlayer(url){
				
				html = '';
				youTubeQueryString();
				
				endpoint = 'https://www.youtube.com/embed/';
				id = youTubeId(url);
				
				if(id) {
					html+= '<iframe width="' + 
					settings.maxwidth + '" height="' + 
					settings.maxheight + '" src="' + 
					endpoint + id + 
					youTubeQueryString() + 
					'" frameborder="0" allowfullscreen></iframe>';
				}
				
				return html;
			}
			
			/*****************************************************************/
		  
		  /**
			  * Build a YouTube embed url query string.
			  * @return string
			  */
		function youTubeQueryString(){
			
			str = '?';
			
			for(i=0;i<settings.youtubeOpts.length;i++) {
				
				opt = settings.youtubeOpts[i];
				str += settings.youtubeOpts[i] + '=' + settings.youtube[opt];
				
				if(i != (settings.youtubeOpts.length - 1))
				{
					 str+= '&amp;'
				} 
			}
		
			return str;
		}  
			

		}
	
	})(jQuery)