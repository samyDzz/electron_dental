const TabGroup = require("electron-tabs");
const dragula = require("dragula");

var active_tabs = [];

var tabGroup = new TabGroup({
  ready: function (tabGroup) {
    dragula([tabGroup.tabContainer], {
      direction: "vertical"
    });
  }
});
var tab0,tab,tab2,tab3,tab4,tab5;

tab0 = tabGroup.addTab({
  title: "Tableau de bord",
  src: path.join ( __dirname, "../dashboard/home.ejs"),
  visible: true,
  closable: false
});
tab0.activate()

function check_tab( name ){
	var tabs = tabGroup.getTabs();
	if( tabs.length > 0 ){
		for (var i = 0; i < tabs.length; i++) {
			if( tabs[i].title == name ) {
				return false;
			}
			if( i == tabs.length-1 ){
				return true;
			}
		}
	}else{
		return true;
	}
}

$('body').on('click','#list_patients',function(){
	if( check_tab("Liste patients") ){
		active_tabs.push("list_patients");
		tab = tabGroup.addTab({
		  title: "Liste patients",
		  src: path.join ( __dirname, "../dashboard/patient.ejs"),
		  visible: true
		});
		tab.activate()
	}else{
		tab.activate()
	}
});

$('body').on('click','#dental_screen',function(){
	if( check_tab('Dental screen') ){
		active_tabs.push("dental_screen");
		tab2 = tabGroup.addTab({
		  title: "Dental screen",
		  src: path.join ( __dirname, "../dashboard/dental_screen.ejs"),
		  visible: true
		});
		tab2.activate()
	}else{
		tab2.activate()
	}
});

$('body').on('click','#patient_visit_list',function(){
	if( check_tab("Patient visit list") ){
		active_tabs.push("patient_visit_list");
		tab3 = tabGroup.addTab({
		  title: "Patient visit list",
		  src: path.join ( __dirname, "../dashboard/traitement.ejs"),
		  visible: true
		});
		tab3.activate()
	}else{
		tab3.activate()
	}
});

$('body').on('click','#settings',function(){
	if( check_tab("Paramètres") ){
		active_tabs.push("settings");
		tab4 = tabGroup.addTab({
		  title: "Paramètres",
		  src: path.join ( __dirname, "../dashboard/settings.ejs"),
		  visible: true
		});
		tab4.activate()
	}else{
		tab4.activate()
	}
});

$('body').on('click','#comptabilites',function(){
	if( check_tab("Comptabilités") ){
		active_tabs.push("comptabilites");
		tab5 = tabGroup.addTab({
		  title: "Comptabilités",
		  src: path.join ( __dirname, "../dashboard/comptabilites.ejs"),
		  visible: true
		});
		tab5.activate()
	}else{
		tab5.activate()
	}
});


$('body').on('click','#add_patient',function(){
	var args = {
	    name : "add_patient.ejs",
	    w : 1000,
	    h : 650,
	    icon_name : path.join(__dirname, "/../../assets/images/logos/logo.png")
	};

	let response = ipcRenderer.sendSync( 'add_patient', args)
});

$('body').on('click','#report_treatement',function(){
	var args = {
	    name : "report_treatement.ejs",
	    w : 500,
	    h : 300,
	    icon_name : path.join(__dirname, "/../../assets/images/logos/logo.png")
	};

	let response = ipcRenderer.sendSync( 'report_treatement', args)
});

$('body').on('click','#dental_procedure_btn',function(e){
	e.preventDefault();
	var args = {
	    name : "dental_procedure.ejs",
	    w : 500,
	    h : 500,
	    icon_name : path.join(__dirname, "/../../assets/images/logos/logo.png")
	};

	let response = ipcRenderer.sendSync( 'create_dental_procedure', args)
});

$('body').on('click','#help',function(e){
	e.preventDefault();
	var args = {
	    name : "help.ejs",
	    w : 250,
	    h : 250,
	    icon_name : path.join(__dirname, "/../../assets/images/logos/logo.png")
	};

	let response = ipcRenderer.sendSync( 'help', args)
});


