from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote
import mimetypes
import os
import time
import webbrowser


ROOT = Path(__file__).resolve().parent
PORT = 4199


class NoCacheHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean_path = unquote(path.split("?", 1)[0].split("#", 1)[0])
        if clean_path in ("/", "/preview-current.html"):
            clean_path = "/index.html"
        return str(ROOT / clean_path.lstrip("/"))

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def guess_type(self, path):
        if path.endswith(".mp4"):
            return "video/mp4"
        return mimetypes.guess_type(path)[0] or "application/octet-stream"

    def log_message(self, format, *args):
        print("[%s] %s" % (time.strftime("%H:%M:%S"), format % args))


if __name__ == "__main__":
    os.chdir(ROOT)
    url = f"http://127.0.0.1:{PORT}/preview-current.html?v={int(time.time())}"
    print("")
    print("个人 IP 网站无缓存预览服务已启动")
    print(f"项目目录: {ROOT}")
    print(f"预览地址: {url}")
    print("")
    print("请保持这个窗口打开。关闭窗口后，预览服务会停止。")
    print("")
    webbrowser.open(url)
    ThreadingHTTPServer(("127.0.0.1", PORT), NoCacheHandler).serve_forever()
