var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var path = require('path');

app.use(express.static('public'));

app.get('*', function(request, response, next){
  fs.readdir('./page', function(error, filelist){
    request.list = filelist;
    next();
  });
});

//메인
app.get('/', function (request, response) {
  fs.readdir('./page', function(error, filelist){
    var title = 'Web Server';
    var description = '포트폴리오용 웹 서버 - 메뉴를 선택하여 사용하세요.';
    var list = '';
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,`
            <nav>
            <ul>
            <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
            <li><a href="/main/portfolio"><img src="/images/menu2.png" width="20%"></a></li>
            <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
            </ul>
            </nav>`
    //  `<a href="/topic/create">create</a>`
    );
    response.send(html);
  });
});

app.get('/main/intro', function(request, response){
  fs.readdir('./page', function(error, filelist){
    var title = '홈페이지 소개';
    var list = '';
    var html = template.HTML(title, list, `<blockquote>
      <img src="/images/intro.png" width="80%">
      </blockquote>`,`
          <nav>
          <ul>
          <li><a href="/main/intro"><img src="/images/menu1-1.png" width="20%"></a></li>
          <li><a href="/main/portfolio"><img src="/images/menu2.png" width="20%"></a></li>
          <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
          </ul>
          </nav>`);
          response.send(html);
  })
      });

//포트폴리오메뉴

app.get('/main/portfolio', function(request, response){
  fs.readdir('./page/port', function(error, filelist){
    var title = '포트폴리오 목록';
    var list = '';
    var html = template.HTML(title, list, ``,`
          <nav>
          <ul>
          <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
          <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
          <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
          </ul>
          </nav>

          <nav>
          <ul>
          <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
          <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
          <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
          </ul>
          </nav>` )
      response.send(html);
  });
});

app.get('/main/portfolio/identity', function(request, response){
  fs.readdir('./page/port/identity', function(error, filelist){
    var title = '';
    var description = '개인정보 파트에서는 자신에대한 기본 <b>신상정보</b>를 포함하여, 여러 <b>이력</b>들을 작성합니다.';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `
      <nav>
      <ul>
      <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
      <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
      <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
      </ul>
      </nav>

      <nav>
      <ul>
      <li><a href="/main/portfolio/identity"><img src="/images/identity2.png" width="20%"></a></li>
      <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
      <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
      </ul>
      </nav>
      <blockquote>
      <a href="/main/portfolio/identity/create"><img src="/images/create.png" width="10%"></a>
      </blockquote>`
      );
      response.send(html);
  });
});

app.get('/main/portfolio/study_activity', function(request, response){
  fs.readdir('./page/port/study_activity', function(error, filelist){
    var title = '';
    var description = '학습 활동파트에서는 <b>자신의 학습 신념, 목표, 자신만의 창의적인 학습 방법, 과목 별로 학습 내용</b>을 작성합니다.';
    var list = template.list2(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `
      <nav>
      <ul>
      <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
      <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
      <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
      </ul>
      </nav>

      <nav>
      <ul>
      <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
      <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity.png" width="20%"></a></li>
      <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
      </ul>
      </nav>
      <blockquote>
      <a href="/main/portfolio/study_activity/create"><img src="/images/create.png" width="10%"></a>
      </blockquote>`
      );
      response.send(html);
  });
});

app.get('/main/portfolio/etc', function(request, response){
  fs.readdir('./page/port/etc', function(error, filelist){
    var title = '';
    var description = '학습 외 활동 파트에서는 <b>동아리, 학과, 봉사 활동 등 학습 외의 활동</b>들을 작성합니다.';
    var list = template.list3(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `
      <nav>
      <ul>
      <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
      <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
      <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
      </ul>
      </nav>

      <nav>
      <ul>
      <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
      <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
      <li><a href="/main/portfolio/etc"><img src="/images/etc2.png" width="20%"></a></li>
      </ul>
      </nav>
      <blockquote>
      <a href="/main/portfolio/etc/create"><img src="/images/create.png" width="10%"></a>
      </blockquote>`
      );
      response.send(html);
  });
});

//identity

app.get('/main/portfolio/identity/create', function(resquest, response){
  fs.readdir('./page/port/identity', function(error, filelist){
    var title = '개인정보 업로드';
    var list = '';
    var html = template.HTML(title, list, `
      <nav>
      <ul>
      <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
      <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
      <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
      </ul>
      </nav>

      <nav>
      <ul>
      <li><a href="/main/portfolio/identity"><img src="/images/identity2.png" width="20%"></a></li>
      <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
      <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
      </ul>
      </nav>
      <blockquote>
      <form action="/main/portfolio/identity/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
      </blockquote>
    `, '');
    response.send(html);
  });
})

app.post('/main/portfolio/identity/create_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`page/port/identity/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/main/portfolio/identity/${title}`});
        response.end();
      })
    });
  });

app.get('/main/portfolio/identity/:pageId', function(request, response) {
  fs.readdir('./page/port/identity', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`./page/port/identity/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = '';
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `
        <nav>
        <ul>
        <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
        <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
        <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
        </ul>
        </nav>

        <nav>
        <ul>
        <li><a href="/main/portfolio/identity"><img src="/images/identity2.png" width="20%"></a></li>
        <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
        <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
        </ul>
        </nav>
        <blockquote>
        <a href="/main/portfolio/identity/create"><img src="/images/create.png" width="10%"></a>
          <a href="/main/portfolio/identity/update/${sanitizedTitle}"><img src="/images/update.png" width="10%"></a>
          <form action="/main/portfolio/identity/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="삭제">
          </form>
        </blockquote>`
      );
      response.send(html);
    });
  });
});

app.get('/main/portfolio/identity/update/:pageId', function(request, response){
  fs.readdir('./page/port/identity', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`page/port/identity/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = '';
      var html = template.HTML(title, list,
        `
        <form action="/main/portfolio/identity/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `        <nav>
                <ul>
                <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
                <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
                <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
                </ul>
                </nav>

                <nav>
                <ul>
                <li><a href="/main/portfolio/identity"><img src="/images/identity2.png" width="20%"></a></li>
                <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
                <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
                </ul>
                </nav>
                <blockquote>
                <a href="/main/portfolio/identity/create"><img src="/images/create.png" width="10%"></a> <a href="/main/portfolio/identity/update/${title}"><img src="/images/update.png" width="10%"></a>
                </blockquote>`
      );
      response.send(html);
    });
  });
});

app.post('/main/portfolio/identity/update_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`page/port/identity/${id}`, `page/port/identity/${title}`, function(error){
        fs.writeFile(`page/port/identity/${title}`, description, 'utf8', function(err){
          response.redirect(`/main/portfolio/identity/${title}`);
        })
      });
  });
});

app.post('/main/portfolio/identity/delete_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`page/port/identity/${filteredId}`, function(error){
        response.redirect('/main/portfolio/identity');
      })
  });
});

//study_activity

app.get('/main/portfolio/study_activity/create', function(resquest, response){
  fs.readdir('./page/port/study_activity', function(error, filelist){
    var title = '학습활동 업로드';
    var list = '';
    var html = template.HTML(title, list, `
      <nav>
      <ul>
      <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
      <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
      <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
      </ul>
      </nav>

      <nav>
      <ul>
      <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
      <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity.png" width="20%"></a></li>
      <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
      </ul>
      </nav>
      <blockquote>
      <form action="/main/portfolio/study_activity/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      </blockquote>
    `, '');
    response.send(html);
  });
})

app.post('/main/portfolio/study_activity/create_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`page/port/study_activity/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/main/portfolio/study_activity/${title}`});
        response.end();
      })
    });
  });

app.get('/main/portfolio/study_activity/:pageId', function(request, response) {
  fs.readdir('./page/port/study_activity', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`./page/port/study_activity/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = '';
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `
        <nav>
        <ul>
        <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
        <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
        <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
        </ul>
        </nav>

        <nav>
        <ul>
        <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
        <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity.png" width="20%"></a></li>
        <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
        </ul>
        </nav>
        <blockquote>
        <a href="/main/portfolio/study_activit/create"><img src="/images/create.png" width="10%"></a>
          <a href="/main/portfolio/study_activity/update/${sanitizedTitle}"><img src="/images/update.png" width="10%"></a>
          <form action="/main/portfolio/study_activity/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>
          </blockquote>`
      );
      response.send(html);
    });
  });
});

app.get('/main/portfolio/study_activity/update/:pageId', function(request, response){
  fs.readdir('./page/port/study_activity', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`page/port/study_activity/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = '';
      var html = template.HTML(title, list,
        `
        <form action="/main/portfolio/study_activity/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `        <nav>
                <ul>
                <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
                <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
                <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
                </ul>
                </nav>

                <nav>
                <ul>
                <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
                <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity.png" width="20%"></a></li>
                <li><a href="/main/portfolio/etc"><img src="/images/etc.png" width="20%"></a></li>
                </ul>
                </nav>
                <blockquote>
                <a href="/main/portfolio/study_activity/create"><img src="/images/create.png" width="10%"></a>
                <a href="/main/portfolio/study_activity/update/${title}"><img src="/images/update.png" width="10%"></a>
                </blockquote>`
      );
      response.send(html);
    });
  });
});

app.post('/main/portfolio/study_activity/update_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`page/port/study_activity/${id}`, `page/port/study_activity/${title}`, function(error){
        fs.writeFile(`page/port/study_activity/${title}`, description, 'utf8', function(err){
          response.redirect(`/main/portfolio/study_activity/${title}`);
        })
      });
  });
});

app.post('/main/portfolio/study_activity/delete_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`page/port/study_activity/${filteredId}`, function(error){
        response.redirect('/main/portfolio/study_activity');
      })
  });
});

//etc

app.get('/main/portfolio/etc/create', function(resquest, response){
  fs.readdir('./page/port/etc', function(error, filelist){
    var title = '학습외 활동 업로드';
    var list = '';
    var html = template.HTML(title, list, `
      <nav>
      <ul>
      <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
      <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
      <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
      </ul>
      </nav>

      <nav>
      <ul>
      <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
      <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
      <li><a href="/main/portfolio/etc"><img src="/images/etc2.png" width="20%"></a></li>
      </ul>
      </nav>
      <blockquote>
      <form action="/main/portfolio/etc/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
      </blockquote>
    `, '');
    response.send(html);
  });
})

app.post('/main/portfolio/etc/create_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`page/port/etc/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/main/portfolio/etc/${title}`});
        response.end();
      })
    });
  });

app.get('/main/portfolio/etc/:pageId', function(request, response) {
  fs.readdir('./page/port/etc', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`./page/port/etc/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = '';
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `
        <nav>
        <ul>
        <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
        <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
        <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
        </ul>
        </nav>

        <nav>
        <ul>
        <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
        <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
        <li><a href="/main/portfolio/etc"><img src="/images/etc2.png" width="20%"></a></li>
        </ul>
        </nav>
        <blockquote>
        <a href="/main/portfolio/etc/create"><img src="/images/create.png" width="10%"></a>
          <a href="/main/portfolio/etc/update/${sanitizedTitle}"><img src="/images/update.png" width="10%"></a>
          <form action="/main/portfolio/etc/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>
          </blockquote>`
      );
      response.send(html);
    });
  });
});

app.get('/main/portfolio/etc/update/:pageId', function(request, response){
  fs.readdir('./page/port/etc', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`page/port/etc/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = '';
      var html = template.HTML(title, list,
        `
        <form action="/main/portfolio/etc/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `        <nav>
                <ul>
                <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
                <li><a href="/main/portfolio"><img src="/images/menu2-2.png" width="20%"></a></li>
                <li><a href="/main/end"><img src="/images/menu3.png" width="20%"></a></li>
                </ul>
                </nav>

                <nav>
                <ul>
                <li><a href="/main/portfolio/identity"><img src="/images/identity.png" width="20%"></a></li>
                <li><a href="/main/portfolio/study_activity"><img src="/images/study_activity2.png" width="20%"></a></li>
                <li><a href="/main/portfolio/etc"><img src="/images/etc2.png" width="20%"></a></li>
                </ul>
                </nav>
                <blockquote>
                <a href="/main/portfolio/etc/create"><img src="/images/create.png" width="10%"></a>
                <a href="/main/portfolio/etc/update/${title}"><img src="/images/update.png" width="10%"></a>
                </blockquote>`
      );
      response.send(html);
    });
  });
});

app.post('/main/portfolio/etc/update_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`page/port/etc/${id}`, `page/port/etc/${title}`, function(error){
        fs.writeFile(`page/port/etc/${title}`, description, 'utf8', function(err){
          response.redirect(`/main/portfolio/etc/${title}`);
        })
      });
  });
});

app.post('/main/portfolio/etc/delete_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`page/port/etc/${filteredId}`, function(error){
        response.redirect('/main/portfolio/etc');
      })
  });
});

app.get('/main/end', function(request, response){
  fs.readdir('./page', function(error, filelist){
    var title = '제작 후기';
    var list = '';
    var html = template.HTML(title, list, `<blockquote><img src="/images/end.png" width="80%">
    </blockquote>`,`
          <nav>
          <ul>
          <li><a href="/main/intro"><img src="/images/menu1.png" width="20%"></a></li>
          <li><a href="/main/portfolio"><img src="/images/menu2.png" width="20%"></a></li>
          <li><a href="/main/end"><img src="/images/menu3-2.png" width="20%"></a></li>
          </ul>
          </nav>`);
          response.send(html);
  })
      });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
