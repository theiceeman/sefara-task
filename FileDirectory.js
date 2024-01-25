const rootDirectory = {};
/*
delete the dir
then append dest to dir then call create 
 */

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

async function main() {
    await new FileDirectory().create('fruits');
    await new FileDirectory().create('grains');
    await new FileDirectory().create('vegetables');
    await new FileDirectory().create('fruits/apples');
    await new FileDirectory().create('fruits/apples/fuji');
    // console.log(JSON.stringify(rootDirectory, null, 2))


    // await new FileDirectory().create('grains/squash');
    // await new FileDirectory().move('grains/squash', 'vegetables');
    // await new FileDirectory().create('foods');
    // await new FileDirectory().move('grains', 'foods');
    // await new FileDirectory().move('fruits', 'foods');
    // await new FileDirectory().move('vegetables', 'foods');


    // await new FileDirectory().delete('osimhen');
    // console.log(JSON.stringify(res, null, 2))


    // await new FileDirectory().move('red/white/blue','john');
    // console.log(JSON.stringify(rootDirectory, null, 2))




    console.log(JSON.stringify(rootDirectory, null, 2))
}
main()
