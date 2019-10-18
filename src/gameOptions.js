export default {
	width:960*(window.innerWidth/window.innerHeight),
	height:960,
	dataName: "JumperPlaneScore",
	music: "JumperPlaneMusic",
	musicOption: localStorage.getItem("JumperPlaneMusic") || "true",
};