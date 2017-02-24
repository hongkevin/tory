window.onload = function () {
CanvasJS.addColorSet("tory",
          [//colorSet Array
            "#930AAC",
            "#6C58C2",
            "#4C98D4",
            "#5D5D5D",
            "#7F7F7F",
            "#B2B2B2",
            "#E5E5E5",
            "#F6F6F6"
          ]);
var chart = new CanvasJS.Chart("chartContainer",
{
    backgroundColor:"white",
    colorSet: "tory",
    theme: "theme2",
    title:{
    },
    toolTip:{
      fontFamily: "맑은 고딕",
      fontStyle:"normal",
      horizontalAlign: "center",
      content: "<span style='\"'color: {color};'\"'>{y}회</span>",
      borderThickness: 3
    },
    data: [
    {
        type: "pie",
        startAngle: 270,
        showInLegend: false,
        //toolTipContent: "{y}회",//"#percent %",
        //yValueFormatString: "#0.#,,. %",
        //legendText: "{indexLabel},{y}",
        indexLabelFontFamily: "맑은 고딕",
        indexLabelWrap: true,
        // indexLabelFormatter: function(e){
        // 		return e.dataPoint.label + "<br>" + e.dataPoint.y + " " + "%" ;
        // },
        indexLabel: "{label} #percent%",
        dataPoints: [ //y값은 '횟수'
            {  y: 30, label:"양성우형", indexLabelFontColor:"#930AAC"},
            {  y: 12, label:"헬리코박터프로젝트", indexLabelFontColor:"#6C58C2" },
            {  y: 11, label:"버벌진트",indexLabelFontColor:"#4C98D4"},
            {  y: 8, label:"안아영",indexLabelFontColor:"#5D5D5D"},
            {  y: 6, label:"해성이형",indexLabelFontColor:"#7F7F7F" },
            {  y: 4, label:"현동이",indexLabelFontColor:"#B2B2B2"},
            {  y: 2, label:"여울",indexLabelFontColor:"#E5E5E5"}
        ]
    }]//data
});
chart.render();
}
