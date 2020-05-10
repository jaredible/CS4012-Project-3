var api_url = "http://localhost:8080/MathbankRESTServer";

var container = document.getElementById("container");

// GOOD
function showProblemListView() {
	loadAllProblems(problems => {
		container.innerHTML = `
			<h1 class="title">Math Problems</h1>
			<ul class="problem-list">
				${problems.map(problem => `
					<li class="">
						<div class="problem-row">
							<div class="mb-2">
								<h5 class="problem-selected d-inline">${problem.id}</h5>
								<input class="float-right mt-2" type="radio" name="problemId" value="${problem.id}">
							</div>
							<span class="problem-content">${problem.content}</span>
						</div>
					</li>
				`).join('')}
			</ul>
			<div class="testing">
				<button class="btn btn-default btn-block" onclick="showProblemListView()">List Problems</button>
				<button class="btn btn-default btn-block" onclick="onAddProblemClicked()">Add Problem</button>
				<button class="btn btn-default btn-block" onclick="onEditProblemClicked()">Edit Problem</button>
				<button class="btn btn-default btn-block" onclick="onDeleteProblemClicked()">Delete Problem</button>
			</div>
		`;

		renderMathJax();
	});
}

function showEditProblemView(id) {
	loadProblem(id, problem => {
		container.innerHTML = `
		<h1 class="title">Update Problem</h1>
		<div class="problem-row h-100">
			<textarea id="problemContent" class="form-control h-100" rows="3" placeholder="Type a problem . . .">${problem.content}</textarea>
		</div>
		<div class="mt-2">
			<button class="btn btn-default btn-block" onclick="onUpdatProblemClicked(${id})">Update Problem</button>
			<button class="btn btn-default btn-block" onclick="showProblemListView()">Cancel</button>
		</div>
	`;
	});
}

function onUpdatProblemClicked(id) {
	updateProblem(id, problem => {
		console.log("Problem updated:", problem);
		showProblemListView();
	});
}

// GOOD
function onAddProblemClicked() {
	container.innerHTML = `
		<h1 class="title">New Problem</h1>
		<div class="problem-row h-100">
			<textarea id="problemContent" class="form-control h-100" rows="3" placeholder="Type a problem . . ."></textarea>
		</div>
		<div class="mt-2">
			<button class="btn btn-default btn-block" onclick="onNewProblemClicked()">New Problem</button>
			<button class="btn btn-default btn-block" onclick="showProblemListView()">Cancel</button>
		</div>
	`;
}

// GOOD
function onNewProblemClicked() {
	createProblem(problem => {
		console.log("Problem created:", problem);
		showProblemListView();
	});
}

// GOOD
function onEditProblemClicked() {
	var selectedProblem = document.querySelector('input[name="problemId"]:checked');
	if (selectedProblem) {
		showEditProblemView(selectedProblem.value);
	} else {
		var error = document.getElementById("error");
		if (error) {
			error.remove();
		}

		container.innerHTML += `
			<div id="error" class="alert alert-danger alert-dismissible">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Error!</strong> No problem selected.
			</div>
		`;
	}
}

// GOOD
function onDeleteProblemClicked() {
	var selectedProblem = document.querySelector('input[name="problemId"]:checked');
	if (selectedProblem) {
		var problemId = selectedProblem.value;
		deleteProblem(problemId, _ => {
			console.log("Problem deleted: " + problemId);
			showProblemListView();
		});
	} else {
		var error = document.getElementById("error");
		if (error) {
			error.remove();
		}

		container.innerHTML += `
			<div id="error" class="alert alert-danger alert-dismissible">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Error!</strong> No problem selected.
			</div>
		`;
	}
}

// GOOD
function loadAllProblems(cb) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var problems = JSON.parse(this.responseText);
			cb(problems);
		}
	};

	xmlhttp.open("GET", `${api_url}/problems`, true);
	xmlhttp.send();
}

// GOOD
function loadProblem(id, cb) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var problem = JSON.parse(this.responseText);
			cb(problem);
		}
	};

	xmlhttp.open("GET", `${api_url}/problems/${id}`, true);
	xmlhttp.send();
}

// GOOD
function createProblem(cb) {
	var problemContent = document.getElementById("problemContent").value;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var problem = JSON.parse(this.responseText);
			cb(problem);
		}
	};

	xmlhttp.open("POST", `${api_url}/problems`, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify({
		id: 0,
		content: problemContent
	}));
}

function editProblem(id) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var problem = JSON.parse(this.responseText);

			container.innerHTML = `
				<h1 class="title">Edit Math Problem</h1>
				<div class="problem-row">
					<h5 id="problemId" class="problem-selected">${problem.id}</h5>
					<textarea id="problemContent" class="form-control" rows="3">${problem.content}</textarea>
				</div>
				<a class="problem-selected" onclick="updateProblem()">
					<i class="material-icons">save</i>
				</a>
			`;
		}
	};

	xmlhttp.open("GET", `${api_url}/problems/${id}`, true);
	xmlhttp.send();
}

function updateProblem(id, cb) {
	var problemContent = document.getElementById("problemContent").value;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var problem = JSON.parse(this.responseText);
			cb(problem);
		}
	};

	xmlhttp.open("PUT", `${api_url}/problems/${id}`, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify({
		id: id,
		content: problemContent
	}));
}

// GOOD
function deleteProblem(id, cb) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			cb();
		}
	};

	xmlhttp.open("DELETE", `${api_url}/problems/${id}`, true);
	xmlhttp.send();
}

function renderMathJax() {
	window.MathJax = {
		tex2jax: {
			inlineMath: [["$", "$"], ["\\(", "\\)"]],
			processEscapes: true
		}
	};
	
	var script = document.createElement("script");
	script.id = "MathJax-script";
	script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
	container.appendChild(script);
}

showProblemListView();