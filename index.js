/* Testing. */
const { closify, entify, minify, prettify } = require('./dist')

const uhtml = `<form id="3"     >     <!-- 
      
This is a comment. --><!-- This is a second comment. --><label for="email-0">

What's your email?</label><input id="email-0" type="email" 
title="We need your email for verification." name="email" required><!--    This is another comment. -->
<label for="1">What fruits do you like?</label><fieldset id="1">
<input id="fruits-1-0" type="checkbox" name="fruits" value="apples">
<label for="fruits-1-0"  >Apples<  /label><br><div><!--      This is an embedded comment. --></div>
<input id="fruits-1-1" type="checkbox" name="fruits" value="grapes">
<label for="fruits-1-1">Grapes</label><br></fieldset>     
<textarea  >

  Did   you know that 3 >   2?

This is another paragraph.   


 </textarea><textarea class="  more  stuff  ">    </textarea>
<br>
</form>`

const ehtml = `<textarea  >

Did   you know that 3 >   2?

This is another paragraph.   


</textarea><textarea class="  more  stuff  ">    </textarea>`

const phtml = `<form id="3">
<!-- This is a comment. -->
<!-- This is a second comment. -->
<label for="email-0">What's your email?</label>
<input id="email-0" type="email" title="We need your email for verification." name="email" required />
<!-- This is another comment. -->
<label for="1">What fruits do you like?</label>
<fieldset id="1">
  <input id="fruits-1-0" type="checkbox" name="fruits" value="apples" />
  <label for="fruits-1-0">Apples</label>
  <br />
  <div>
    <!-- This is an embedded comment. -->
  </div>
  <input id="fruits-1-1" type="checkbox" name="fruits" value="grapes" />
  <label for="fruits-1-1">Grapes</label>
  <br />
</fieldset>
<textarea>Did you know that 3 &gt; 2?&#13;&#13;This is another paragraph.</textarea>
<textarea class="more stuff"></textarea>
<br>
</form>`

const chtml = `<form id="3">
<!-- This is a comment. -->
<!-- This is a second comment. --><br><input><br><input>`

const prettified_html = prettify(uhtml)
const entified_html = entify(ehtml, true)
const minified_html = minify(phtml)
const closified_html = closify(chtml)

console.log('All pretty:')
console.log(prettified_html, '\n')
console.log('With entities:')
console.log(entified_html, '\n')
console.log('All minified:')
console.log(minified_html, '\n')
console.log('With self-closing:')
console.log(closified_html)
