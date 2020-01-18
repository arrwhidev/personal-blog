build:
	mkdir -p functions
	cd ./src/functions
	go get ./...
	go build -o ../../functions/hello hello.go