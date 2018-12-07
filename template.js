module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <style type="text/css">

      nav ul li {
        display:inline;
        padding:0 10px;
        font: bold 16px Arial;
      }

      </style>
    </head>
          <blockquote>
    <body>
      <h1><a href="/"><img src="/images/main.jpg" width="75%"></a></h1>
      ${control}
      ${body}
      <nav>
      ${list}
      </nav>

    </blockquote>
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/main/portfolio/identity/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },list2:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/main/portfolio/study_activity/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },list3:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/main/portfolio/etc/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
