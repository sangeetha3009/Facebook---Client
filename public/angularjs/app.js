var app=angular.module('myapp',['ngRoute']);

// Controllers
app.controller('searchcnt',function($rootScope,$scope,$http,$route, $location, $routeParams) {
			$scope.location=$location.url();
			$scope.showdiv;
			$scope.button_val;
			$scope.user;
			$scope.token;
			$scope.name_to_fill_abt;
			$scope.abt_interests;
			$scope.abt_lives_in;
			$scope.abt_from_place;
			$scope.abt_contact;
			$scope.abt_life;
			$scope.final_list=[];
			$scope.groupList=[];
			$scope.grpset;
			$scope.gMember;
			$scope.gmem=[];
			$scope.gmem_var;
			$scope.members=[];
			for(var i=0;i<$scope.final_list.length;i++){
				 $scope.final_list[i]=0;
			}
			
			//call to get the groups the user is a member of
			$http({
				method : "post",
				url : '/getGroups',
				data:{"groupof":"session"}
			
			 }).success(function(data) {
				 for(var i=0;i<data.groupList.length;i++){
					 $scope.groupList[i]=data.groupList[i];
				 $scope.showgroups=1;
				 }
				 
			 }).error(function(error) {
				 console.log("error in retrieving grouplist");
			});
			
			
			
			//check the URL and get the slected group name
			if($scope.location.indexOf('/group/')!=-1){
				$scope.grpName=$scope.location.split('/group/').toString();
				$scope.grpName=$scope.grpName.slice(1);
				$scope.grpset=1;
			}
			
			$scope.location=$location.url();

			$scope.grpName;
			if($scope.location==='/about' || $scope.grpset==1){
				$scope.user=1;	

				//Fill Details for about page
				$http({
					method : "post",
					url : '/fill_abt_page',
					data:{"abt_name":"1"}
					
				}).success(function(data) {
					
					$scope.abt_interests=data.interests;
					$scope.abt_lives_in=data.lives_in;
					$scope.abt_from_place=data.from_place;
					$scope.abt_work=data.work;
					$scope.abt_contact=data.contact;
					$scope.abt_life=data.life;
					
				}).error(function(error) {
					
				});	
		
		
		
				//getfriendlist of user
				$http({
					method : "POST",
					url : '/getfriends',
					data:{"friendof":"session"}
			
				 }).success(function(data) {
					 $scope.final_list=data.friends_name;
					 
				 }).error(function(error) {
					 console.log("error");
			});
		
		}
		else{
			$scope.user=0;
			$scope.token=($scope.location.split('/about/')).toString();
			$scope.token=$scope.token.slice(1);
			$scope.name_to_fill_abt=$scope.token;
			$http({
					method : "POST",
					url : '/isfriend',
					data:{"frnd":$scope.token}
			
				 }).success(function(data) {
					 $scope.showdiv=data.q;
					 if($scope.showdiv==1)
						 $scope.button_val="Add Friend";
					 if($scope.showdiv==2)
						 $scope.button_val="Friend Request Sent";	
					 if($scope.showdiv==3)
						 $scope.button_val="Accept Request";
					 if($scope.showdiv==4)
						 $scope.button_val="Friends";
			
				 }).error(function(error) {
					 console.log("error");
			});
			
			
			//Fill Details for about page
			$http({
				method : "post",
				url : '/fill_abt_page',
				data:{"abt_name":$scope.token}
				
			}).success(function(data) {
				
				$scope.abt_interests=data.interests;
				$scope.abt_lives_in=data.lives_in;
				$scope.abt_from_place=data.from_place;
				$scope.abt_work=data.work;
				$scope.abt_contact=data.contact;
				$scope.abt_life=data.life;
				
			}).error(function(error) {
				
			});		
			
			
				//List for about page of friend
				$http({
					method : "POST",
					url : '/getfriends',
					data:{"friendof":$scope.token}
			
				 }).success(function(data) {
					 for(var i=0;i<$scope.final_list.length;i++){
						 $scope.final_list[i]=0;
					 }
					 $scope.final_list=data.friends_name; 
					 
				 }).error(function(error) {
					 console.log("error");
			});
								
		}
			


			$scope.userlist=[];
			$scope.friend;
			$scope.view;
			
			//get session value to display on top nav
			$scope.initsession = function() {
						$http({
								method : "GET",
								url : '/getSessionData'
							}).success(function(data) {
								if(data.statusCode===200){
									$scope.uname = data.name;
									$scope.friend=0;
								}
							}).error(function(error) {
								console.log("error");
						});
					};

	
			$scope.init = function() {
					$http({
							method : "GET",
							url : '/getusers'
						}).success(function(data) {
								if(data.statusCode===200){	
										$scope.userlist = data.list;
								}
						}).error(function(error) {
							console.log("error");
					});
				};
	
				//add member to group
				$scope.addToGroup=function(){
					
					$http({
						method : "POST",
						url : '/addToGroup',
						data:{"gname":$scope.grpName,"gmem":$scope.gMember}
					}).success(function(data) {
							if(data.statusCode===200){	
								
							}
					}).error(function(error) {
						console.log("error");
				});
			};
	
			//delete member from group
			$scope.deleteFromGroup=function(){
					
				$http({
					method : "POST",
					url : '/deleteFromGroup',
					data:{"gname":$scope.grpName,"gmem":$scope.gMember}
				}).success(function(data) {
						if(data.statusCode===200){	
								//alert('success deleted');
						}
				}).error(function(error) {
					console.log("error");
			  });
			};
			
			//Sending Friend Request
			$scope.addfriend=function(token,button_val){
				if(button_val==="Add Friend"){
					$http({
						method : "post",
						url : '/add',
						data:{"val":$scope.token}
						}).success(function(data) {
							
						$scope.showdiv=data.m;
						if($scope.showdiv==2)
							$scope.button_val="Friend Request Sent";

						}).error(function(error) {
							
						});
					}
				//Accepting Friend Request and Changing status to Friends
				if(button_val==="Accept Request"){
							
					$http({
							method : "post",
							url : '/accept',
							data:{"val":$scope.token}
							}).success(function(data) {
								
							$scope.showdiv=data.m;
							if($scope.showdiv==4)
								$scope.button_val="Friends";
							}).error(function(error) {
								
							});
					}
						
				};
					
				$scope.load=function(srch){	
					$http({
						method : "post",
						url : '/getfriend',
						data:{"search":srch}
					}).success(function(data) {
						$scope.friend=1;		
						$scope.secondary_name=data.fr_name;		
					}).error(function(error) {
							
					});
				};
						
				$scope.disp_gname;
					
				//Create Group Function
				$scope.createGroup=function(gname,gmem_var){
					$http({
						method : "post",
						url : '/createGroup',
						data:{"gname":gname,"gmem":gmem_var}
					}).success(function(data) {
						$scope.disp_gname=data.gname;
								
					}).error(function(error) {
						alert("Error in group creation");
								
					});
							
				};	
						
				//Delete a Group	
				$scope.deleteGroup=function(gname){
					$http({
						method : "post",
						url : '/deleteGroup',
						data:{"gname":gname}
					}).success(function(data) {
							
					}).error(function(error) {
						alert("Error in group deletion");
								
					});
							
				};	
						
				//get Group Members
				$scope.showmem;
				$scope.showMembers=function(grpName){
					$scope.grpName=grpName;
					$http({
						method : "post",
						url : '/getMembers',
						data:{"gname":$scope.grpName}
					}).success(function(data) {
						$scope.members=data.members[0];
						$scope.showmem=1;
							
					}).error(function(error) {
						alert("Error in retreiving group members");
							
					});
				};
						
		});



app.controller('personal_page',function($rootScope,$scope,$http,$route, $location, $routeParams) {
	$scope.overview;
	$scope.work;
	$scope.interests;
	$scope.from_place;
	$scope.lives_in;
	$scope.contact;
	$scope.life;
	
	//Get values for view/edit profile page
	$http({
		
		method : "get",
		url : '/fillvalues',
		
		
	}).success(function(data) {
		
		
		$scope.overview=data.overview;
		$scope.work=data.work;
		$scope.interests=data.interests;
		$scope.lives_in=data.lives_in;
		$scope.from_place=data.from_place;
		$scope.contact=data.contact;
		$scope.life=data.life;
		
	}).error(function(error) {
		alert('some error has occured in filldata get call');
		
	});
	
	
	//Fn to Update profile information
	$scope.addoverview=function(){
		
		
		$http({
			method : "post",
			url : '/add_overview',
			data:{"overview":$scope.overview}
			
		}).success(function(data) {
				
			
		}).error(function(error) {
			
		});
	};

	//Fn to Update profile information
	$scope.addwork=function(){
		$http({
			method : "post",
			url : '/add_work',
			data:{"work":$scope.work}

		}).success(function(data) {
			

		}).error(function(error) {

		});

	};

	//Fn to Update profile information
	$scope.add_lives_in=function(){
		$http({
			method : "post",
			url : '/add_lives_in',
			data:{"lives_in":$scope.lives_in}

		}).success(function(data) {
				

		}).error(function(error) {
			alert('Error has occured in add place details call');
		});

	};
	

	//Fn to Update profile information
	$scope.add_from_place=function(){
		$http({
			method : "post",
			url : '/add_from_place',
			data:{"from_place":$scope.from_place}
		}).success(function(data) {
				

		}).error(function(error) {
			alert('Error has occured in user from place call');
		});

	};
	
	
	//Fn to Update profile information
	$scope.addinterests=function(){
		$http({
			method : "post",
			url : '/add_interests',
			data:{"interests":$scope.interests}

		}).success(function(data) {
				

		}).error(function(error) {
			alert('Error has occured in add interests post call');
		});

	};
	
	
	//Fn to Update profile information
	$scope.addContact=function(){
		$http({
			method : "post",
			url : '/add_contact',
			data:{"contact":$scope.contact}

		}).success(function(data) {
					

		}).error(function(error) {
			alert('Error has occured in add contact post call');
		});

	};
	
	
	//Fn to Update profile information
	$scope.addLife=function(){
		$http({
			method : "post",
			url : '/add_life',
			data:{"life":$scope.life}

		}).success(function(data) {
						

		}).error(function(error) {
			alert('some error has occured in add life post call');
		});

	};

});	


//Client side Routing 
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
    	.when('/',{
  	   
    		templateUrl: 'partials/news.ejs',
    		controller: 'searchcnt'
    	})
    	.when('/about',{
  	   
    		templateUrl: 'partials/about.ejs',
    		controller: 'searchcnt'
    	})
    	.when('/news',{
  	   
    		templateUrl: 'partials/news.ejs',
    		controller: 'searchcnt'
    	})
    	.when('/about/:srch',{
  	   
    		templateUrl: 'partials/about.ejs',
    		controller: 'searchcnt'
    	})
    	.when('/personal_details',{
  	   
    		templateUrl: 'partials/personal_details.ejs',
    		controller: 'personal_page'
    	})
    	.when('/group/:gr',{
  	   
    		templateUrl: 'partials/group.ejs',
    		controller: 'searchcnt'
    	})
    	.when('/view_profile',{
  	   
    		templateUrl: 'partials/view_profile.ejs',
    		controller: 'personal_page'
    	})
    	.otherwise({ redirectTo: "/" });

	}]);

app.controller('validateCtrl', function($scope) {
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});


