// socket.read()는 블로킹
// data가 사용가능해질 때까지 스레드를 블로킹
data = socket.read()
// data 사용 가능
print(data)

