import { useState } from 'react'

function Versions() {
  const [versions] = useState(window.electron.process.versions)

  console.log(versions)

  return (
    <div className="m-20 justify-center mx-auto ml-10 mr-10">
      <div>
        <p className="mb-5">MIT License</p>
        <p className="mb-5">Copyright (c) 2023 Ivan Kotze</p>
        <p className="mb-5">
          Permission is hereby granted, free of charge, to any person obtaining a copy of this
          software and associated documentation files (the "Software"), to deal in the Software
          without restriction, including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
          to whom the Software is furnished to do so, subject to the following conditions:
        </p>

        <p className="mb-5">
          The above copyright notice and this permission notice shall be included in all copies or
          substantial portions of the Software.
        </p>
        <p className="mb-5">
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
          FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
          DEALINGS IN THE SOFTWARE.
        </p>
      </div>

      <ul className="versions flex gap-10 justify-center mx-auto">
        <li className=" badge badge-primary">Electron v{versions.electron}</li>
        <li className="badge badge-primary">Chromium v{versions.chrome}</li>
        <li className=" badge badge-primary">Node v{versions.node}</li>
        <li className=" badge badge-primary">V8 v{versions.v8}</li>
      </ul>
    </div>
  )
}

export default Versions
