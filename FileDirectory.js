const rootDirectory = {};

class FileDirectory {

    async create(dir) {
        const commands = dir.split('/');
        let currentDirectory = rootDirectory;

        for (const directory of commands) {
            if (directory) {
                if (!currentDirectory[directory]) {
                    currentDirectory[directory] = {};
                }
                currentDirectory = currentDirectory[directory];
            }
        }
        return rootDirectory;
    }

    move(dir, dest) {
        this.delete(dir);
        this.create(`${dest}/${dir}`)
    }

    list() {
        return rootDirectory;
    }

    async delete(dir) {
        const commands = dir.split('/');
        let currentDirectory = rootDirectory;
        let parentDirectory = null;

        for (const directory of commands) {
            if (directory) {
                if (currentDirectory[directory]) {
                    parentDirectory = currentDirectory;
                    currentDirectory = currentDirectory[directory];
                } else {
                    throw new Error(`Cannot delete ${dir} - ${directory} does not exist`);
                    return;
                }
            }
        }

        const targetDirectory = commands.pop();
        delete parentDirectory[targetDirectory];
        return rootDirectory;
    }
}

let fileDirectory = new FileDirectory();


module.exports = fileDirectory
