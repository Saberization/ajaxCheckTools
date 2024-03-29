(function (ace, js_beautify) {
  'use strict'

  const ajaxParamsEditor = ace.edit('ajaxParams');
  const resultEditor = ace.edit('result');
  const interfaceEl = document.getElementById('interface');
  const streamEl = document.getElementById('stream');

  ajaxParamsEditor.setTheme('ace/theme/xcode');
  ajaxParamsEditor.getSession().setMode("ace/mode/json");
  ajaxParamsEditor.setFontSize(14);
  ajaxParamsEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });

  resultEditor.setTheme('ace/theme/xcode');
  resultEditor.getSession().setMode("ace/mode/json");
  resultEditor.setFontSize(14);
  resultEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });

  function initListener() {
    document.getElementById('btn-beautify').addEventListener('click', () => {
      ajaxParamsEditor.setValue(js_beautify(ajaxParamsEditor.getValue()));
    });

    document.getElementById('btn-request').addEventListener('click', () => {
      request({
        url: interfaceEl.value,
        params: ajaxParamsEditor.getValue()
      });
    });

    document.getElementById('inputfile').addEventListener('change', function () {
      imageToBase64(this.files[0]);
    });
  }

  function request({
    url,
    params
  }) {
    try {
      JSON.parse(params);
    } catch (error) {
      params = JSON.stringify(eval('(' + params + ')'))
    }

    $.ajax({
      url,
      type: 'post',
      data: params,
      contentType: 'application/json',
      dataType: 'json',
      success: (response) => {
        resultEditor.setValue(typeof response === 'string' ? response : js_beautify(JSON.stringify(response)));
      },
      error: (error) => {
        resultEditor.setValue(JSON.stringify(error));
      }
    });
  }

  function imageToBase64(file) {
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(file);
    fileReader.onload = event => {
      streamEl.value = event.target.result;
    };
  }

  initListener();
}(window.ace, window.js_beautify))