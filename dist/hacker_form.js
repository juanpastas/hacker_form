// Generated by CoffeeScript 1.9.3
(function() {
  var questionHtml, render, types,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  types = ['text', 'radio', 'checkbox', 'textarea'];

  questionHtml = function(hcf) {
    var _for, hOption, header, i, id, input, j, label, len, lines, name_and_id, option, options, ref, type, typed;
    lines = hcf.split('\n');
    header = lines[0].split(': ');
    id = header[0];
    name_and_id = function(n) {
      if (n == null) {
        n = '';
      }
      return "name='" + id + "' id='" + (id + n) + "'";
    };
    label = header[1];
    typed = (ref = (type = (lines[1] || '').trim()), indexOf.call(types, ref) >= 0);
    type = typed ? type : 'text';
    _for = "for='" + id + "'";
    if (type === 'text') {
      input = "<input type='text' " + (name_and_id()) + ">";
      return ("<label " + _for + ">" + label + "</label><br/>") + input + "<br/>";
    } else if (type === 'textarea') {
      input = "<textarea " + (name_and_id()) + "></textarea>";
      return ("<label " + _for + ">" + label + "</label><br/>") + input + "<br/>";
    } else {
      options = typed ? lines.slice(2) : lines.slice(1);
      options.pop();
      input = '';
      for (i = j = 0, len = options.length; j < len; i = ++j) {
        option = options[i];
        _for = "for='" + id + "_" + i + "'";
        input += "<label " + _for + ">";
        hOption = "\n<span>" + (option.trim()) + "</span>";
        if (option === options[options.length - 1] && option.match(/\sother/i)) {
          input += hOption + " <input class='other' type='text' name='" + id + "_other' id='" + id + "'>";
        } else {
          input += "<input type='" + type + "' " + (name_and_id('_' + i)) + ">" + hOption;
        }
        input += "</label><br/>";
      }
      return ("<p>" + label + "</p>") + input;
    }
  };

  render = function(form) {
    var hcf, html, j, len, question, questions;
    hcf = form.text();
    questions = hcf.split("- ").slice(1);
    html = '';
    for (j = 0, len = questions.length; j < len; j++) {
      question = questions[j];
      html += questionHtml(question);
    }
    return form.html(html);
  };

  render($('form.h'));

}).call(this);
