angular.module("exampleApp", [])
.controller("defaultCtrl", function ($scope, $http) {
	
	$scope.inputPattern = new RegExp("^[a-z]");	
	$scope.repoInfo = "";
	var repoName=[]; 

	$scope.getGitUserInfo = function () {
		
		$scope.showLength = false;
		var userName = $("#gitUsr").val();
		if(userName){
			//https://api.github.com/users/pdsullivan/repos
			$scope.username =  userName; // "pdsullivan", "timothyganesh"; 

				$http.get("https://api.github.com/users/"+$scope.username+"/repos")
						.success(function(data) {
							$scope.repoInfo = data;
							if($scope.repoInfo.length>0){
								$scope.showLength = true; 
							}else{
								$scope.errMsg = "User Doest not Exits, Please check User Name";	
							}
						
							
							for(i=0; i< $scope.repoInfo.length; i++){
								repoName.push($scope.repoInfo[i].name); 		
							}	
							$scope.getChart(repoName);
							repoName.length=0;
							
						}).error(function(data){
							//alert('error');	
						});
				}
				else 
				{
					$scope.errMsg = 'Please Enter User Name ';

				}
				
			}
	
	
	
				$scope.getCommits = function(repo) {
					$http.get("https://api.github.com/repositories/" + repo.id + "/commits")
						.success(function(data) {
							//repo.commits = data;
							$scope.repoCommits = data; 
							console.log($scope.repoCommits);	
							
						}) 
				}  

	$scope.getChart = function(repoName){
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: repoName, 
			responsive: true, 
			datasets: [{
				label: 'No of Committs',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',,
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(153, 102, 255, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(153, 102, 255, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
	
	}
	
	
});