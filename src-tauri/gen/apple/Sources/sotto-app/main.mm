#include "bindings/bindings.h"
#include <unistd.h>

int main(int argc, char * argv[]) {
    sleep(3);
	ffi::start_app();
	return 0;
}
