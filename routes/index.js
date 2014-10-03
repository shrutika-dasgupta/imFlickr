app = require('../app');
var Flickr = require('flickrapi');

/*--------------- All Routes ------------------------*/
app.get('/', function(req, res){
	res.render('template3' );
});

function twoDigits(d) 
{
    if(0 <= d && d < 10) 
    	return "0" + d.toString();
    if(-10 < d && d < 0) 
    	return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() 
{
    return this.getUTCFullYear() + "-" 
    	+ twoDigits(1 + this.getUTCMonth()) + "-" 
    	+ twoDigits(this.getUTCDate()) + " " 
    	+ twoDigits(this.getUTCHours()) + ":" 
    	+ twoDigits(this.getUTCMinutes()) + ":" 
    	+ twoDigits(this.getUTCSeconds());
};

app.post('/test', function(request,result){


	//var query = request.body.search_query;
	//console.log("recieved the query: " + query);

	var search_query = null;
	var user_name = null;
	var min_upload_date = null;
	var max_upload_date = null;

	if(request.body.search_query != "")
	{
		var search_query_init = request.body.search_query;
		search_query = search_query_init.split(' ').join('+');
	}	
	
	if(request.body.user_name != "")
	{
		user_name = (request.body.user_name).split(' ').join('+');
	}

	if(request.body.min_upload_date != "")
		min_upload_date = new Date(request.body.min_upload_date).toMysqlFormat();
	if(request.body.max_upload_date != "")
		max_upload_date = new Date(request.body.max_upload_date).toMysqlFormat();

	if(search_query == null && user_name == null && min_upload_date == null && max_upload_date == null)
	{
		result.redirect('/?invalid_inputs');
	}

	var flickrOptions = 
	{
	    api_key : "b2c3a760a15f0a7eb0f03d228a4b68c3",
	    secret : "0337ca2063d0daea"
	};

	if(user_name == null )
	{

		Flickr.tokenOnly(flickrOptions,function(error, flickr) {

			flickr.photos.search({
				min_upload_date: min_upload_date,
				max_upload_date: max_upload_date,
				text: search_query,
				page: 1,
				per_page: 500
			},function(err, res) {
				if(res)
				{
					if(res.photos.pages == 0)
					{
						result.redirect('/?invalid_inputs');
					}
					console.log(res);
					var photo_urls= new Array(res.photos.photo);
					for (var i = res.photos.photo.length - 1; i >= 0 && i < 500; i--) {
						photo_urls[i] = "https://farm"+res.photos.photo[i].farm+".staticflickr.com/"+res.photos.photo[i].server+"/"+res.photos.photo[i].id+"_"+res.photos.photo[i].secret+"_";
					};
					result.render('test', {urls: photo_urls});
				}
				else
				{
					console.log("Query is not found");
				}
			});
		});

		/*Flickr.tokenOnly(flickrOptions,function(error, flickr) {

			flickr.photos.search({
				min_upload_date: min_upload_date,
				max_upload_date: max_upload_date,
				text: search_query,
				page: 1,
				per_page: 500
			},function(err_p, res_p) {
				if(res_p)
				{
					var user_profile = new Array(res.photos.photo.length);
					var photo_user_id = new Array(res.photos.photo.length);

					var photo_urls= new Array(res.photos.photo);
					for (var i = res_p.photos.photo.length - 1; i >= 0 && i < 500; i--) {

						photo_user_id[i] = res_p.photos.photo[i].owner;
					};

					for (var i = photo_user_id.length - 1 && i < 500; i >= 0; i--) {

						Flickr.tokenOnly(flickrOptions,function(error, flickr) {

							flickr.urls.getUserProfile({
								user_id: photo_user_id[i],
								
							},function(err_up, res_up) {
								if(res_up)
								{
									user_profile[i] = res_up.user.url;
									console.log(res_up.user.url);
								}
								else
								{
									console.log("user not found");
								}
								console.log(user_profile);
							});
						});
					};

					for (var i = res.photos.photo.length - 1; i >= 0 && i < 500; i--) {
						photo_urls[i] = "https://farm"+res.photos.photo[i].farm
						+".staticflickr.com/"+res.photos.photo[i].server
						+"/"+res.photos.photo[i].id+"_"
						+res.photos.photo[i].secret+"_m.jpg";
					}
					result.render('test', {urls: photo_urls});
					
				}
				else
				{
					console.log("Query is not found");
				}
			});
		});*/
	}
	else
	{
		console.log("inside else");
		Flickr.tokenOnly(flickrOptions,function(error, flickr) {

			flickr.people.findByUsername({
				username: user_name
			},function(err, res) {
				if(res)
				{
					var user_id = res.user.id;

					Flickr.tokenOnly(flickrOptions,function(error, flickr) {

						flickr.photos.search({
							user_id: user_id,
							min_upload_date: min_upload_date,
							max_upload_date: max_upload_date,
							text: search_query,
							page: 1,
							per_page: 500
						},function(err, res) {
							if(res)
							{
								var photo_urls= new Array(res.photos.photo);
								for (var i = res.photos.photo.length - 1; i >= 0 && i < 500; i--) {
									photo_urls[i] = "https://farm"+res.photos.photo[i].farm+".staticflickr.com/"+res.photos.photo[i].server+"/"+res.photos.photo[i].id+"_"+res.photos.photo[i].secret+"_";
								};
								result.render('test', {urls: photo_urls});
							}
							else
							{
								console.log("Query is not found");
							}
						});
					});
				}
				else
				{
					console.log("User name is invalid");
					result.redirect('/?invalid_username');
				}
			});
		});
	}
});

app.post('/loadNext', function(request, result){

});

//console.log("window variable: ", window.photos);

app.get('/temp3', function(req, res){
	res.render('template3' );
});

app.get('/temp1', function(req, res){
	res.render('template');
});
