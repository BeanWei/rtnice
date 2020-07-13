var cssTemplates = {}

cssTemplates.basic = {
    '#rtnice': `font-size: 16px; color: black; padding: 0 10px; line-height: 1.6; word-spacing: 0px; letter-spacing: 0px; word-break: break-word; word-wrap: break-word; text-align: left; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;`,
    'a': `text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;`,
    'p': `font-size: 16px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;`,
    'h1': `font-size: 24px; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h2': `font-size: 22px; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h3': `font-size: 20px; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h4': `font-size: 18px; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h5': `font-size: 16px; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h6': `font-size: 16px; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h1 .prefix': `display: none;`,
    'h2 .prefix': `display: none;`,
    'h3 .prefix': `display: none;`,
    'h4 .prefix': `display: none;`,
    'h5 .prefix': `display: none;`,
    'h6 .prefix': `display: none;`,
    'h1 .content': `display: inline-block;`,
    'h2 .content': `display: inline-block;`,
    'h3 .content': `display: inline-block;`,
    'h4 .content': `display: inline-block;`,
    'h5 .content': `display: inline-block;`,
    'h6 .content': `display: inline-block;`,
    'h1 .suffix': `display: none;`,
    'h2 .suffix': `display: none;`,
    'h3 .suffix': `display: none;`,
    'h4 .suffix': `display: none;`,
    'h5 .suffix': `display: none;`,
    'h6 .suffix': `display: none;`,
    'ul': `margin-top: 8px; margin-bottom: 8px; padding-left: 25px; color: black; list-style-type: disc;`,
    'ul ul': `list-style-type: square;`,
    'ol': `margin-top: 8px; margin-bottom: 8px; padding-left: 25px; color: black; list-style-type: decimal;`,
    'li section': `margin-top: 5px; margin-bottom: 5px; line-height: 26px; text-align: left; color: rgb(1,1,1); font-weight: 500;`,
    'blockquote': `display: block; font-size: 0.9em; overflow: auto; overflow-scrolling: touch; border-left: 3px solid rgba(0, 0, 0, 0.4); background: rgba(0, 0, 0, 0.05); color: #6a737d; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 10px; margin-bottom: 20px; margin-top: 20px;`,
    'blockquote p': `margin: 0px; color: black; line-height: 26px;`,
    'strong': `font-weight: bold; color: black;`,
    'em': `font-style: italic; color: black;`,
    'em strong': `font-weight: bold; color: black;`,
    'del': `font-style: italic; color: black;`,
    'hr': `height: 1px; margin: 0; margin-top: 10px; margin-bottom: 10px; border: none; border-top: 1px solid black;`,
    'img': `display: block; margin: 0 auto; max-width: 100%;`,
    'figcaption': `margin-top: 5px; text-align: center; color: #888; font-size: 14px;`,
    'table': `display: table; text-align: left; border-collapse: collapse;`,
    'tbody': `border: 0;`,
    'tbody tr': `border: 0; border-top: 1px solid #ccc; background-color: white;`,
    'tbody tr th': `font-size: 16px; border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-weight: bold; background-color: #f0f0f0;`,
    'tbody tr td': `font-size: 16px; border: 1px solid #ccc; padding: 5px 10px; text-align: left;`,
    'table tr:nth-child(2n)': `background-color: #F8F8F8;`,
    'table tr th:nth-of-type(n)': `min-width:85px;`,
    'table tr td:nth-of-type(n)': `min-width:85px;`,
    'sub': `line-height: 0;`,
    'sup': `line-height: 0;`,
    'figure': `margin: 0; margin-top: 10px; margin-bottom: 10px; display:flex; flex-direction: column; justify-content: center; align-items: center;`,
    'figure a': `border: none;`,
    'figure a img': `margin: 0px;`,
    'figure a + figcaption': `display: flex; justify-content: center; align-items: center; width: 100%; margin-top: -35px; background: rgba(0,0,0,0.7); color: white; line-height: 35px; z-index: 20;`,

    // code block - [WeChat Style]
    'pre': `margin-top: 0px; margin-bottom: 10px;`,
    'pre code': `display: -webkit-box; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; border-radius: 0px; font-size: 12px; -webkit-overflow-scrolling: touch;`,
    'p code': `font-size: 14px; word-wrap: break-word; padding: 2px 4px; border-radius: 4px; margin: 0 2px; color: #1e6bb8; background-color: rgba(27,31,35,.05); font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; word-break: break-all;`,
    'li code': `font-size: 14px; word-wrap: break-word; padding: 2px 4px; border-radius: 4px; margin: 0 2px; color: #1e6bb8; background-color: rgba(27,31,35,.05); font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; word-break: break-all;`,
    'pre code span': `line-height: 26px;`,
    '.code-snippet__fix': `word-wrap: break-word !important; font-size: 14px; margin: 10px 0; display: block; color: #333; position: relative; background-color: rgba(0,0,0,0.03); border: 1px solid #f0f0f0; border-radius: 2px; display: flex; line-height: 20px;`,
    '.code-snippet__fix pre': `margin-bottom: 10px; margin-top: 0px;`,
    '.code-snippet__fix .code-snippet__line-index': `counter-reset: line; flex-shrink: 0; height: 100%; padding: 1em; list-style-type: none; padding: 16px; margin: 0;`,
    '.code-snippet__fix .code-snippet__line-index li': `list-style-type: none; text-align: right; line-height: 26px; color: black; margin: 0;`,
    '.code-snippet__fix .code-snippet__line-index li::after': `min-width: 1.5em; text-align: right; left: -2.5em; counter-increment: line; content: counter(line); display: inline; color: rgba(0,0,0,0.3);`,
    '.code-snippet__fix pre': `overflow-x: auto; padding: 16px; padding-left: 0; white-space: normal; flex: 1; -webkit-overflow-scrolling: touch;`,
    '.code-snippet__fix code': `text-align: left; font-size: 14px; display: block; white-space: pre; display: flex; position: relative; font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace; padding: 0px;`
}

cssTemplates.orange = {
    'a': `text-decoration: none; color: rgb(239, 112, 96); word-wrap: break-word; font-weight: bold; border-bottom: 1px solid rgb(239, 112, 96);`,
    'h2': `border-bottom: 2px solid rgb(239, 112, 96); font-size: 1.3em; margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black;`,
    'h2 .content': `display: inline-block; font-weight: bold; background: rgb(239, 112, 96); color: #ffffff; padding: 3px 10px 1px; border-top-right-radius: 3px; border-top-left-radius: 3px; margin-right: 3px;`,
    'h2::after': `display: inline-block; content: " "; vertical-align: bottom; border-bottom: 36px solid #efebe9; border-right: 20px solid transparent;`,
    'blockquote': `display: block; font-size: 0.9em; overflow: auto; overflow-scrolling: touch; border-left: 3px solid rgb(239, 112, 96); background: #fff9f9; color: #6a737d; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 10px; margin-bottom: 20px; margin-top: 20px;`,
    'p code': `font-size: 14px; word-wrap: break-word; padding: 2px 4px; border-radius: 4px; margin: 0 2px; color: rgb(239, 112, 96); background-color: rgba(27,31,35,.05); font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; word-break: break-all;`,
    'li code': `font-size: 14px; word-wrap: break-word; padding: 2px 4px; border-radius: 4px; margin: 0 2px; color: rgb(239, 112, 96); background-color: rgba(27,31,35,.05); font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; word-break: break-all;`,
}

export default cssTemplates