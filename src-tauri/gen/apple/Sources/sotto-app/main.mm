#include "bindings/bindings.h"
#include <unistd.h>

int main(int argc, char * argv[]) {
    sleep(1);
	ffi::start_app();
	return 0;
}
