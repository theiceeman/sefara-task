const FileDirectory = require("../FileDirectory");

async function main() {
  await FileDirectory.create('fruits');
  await FileDirectory.create('grains');
  await FileDirectory.create('vegetables');
  await FileDirectory.create('fruits/apples');
  let create = await FileDirectory.create('fruits/apples/fuji');
  console.log('--- create---', JSON.stringify(create, null, 2))




  await FileDirectory.delete('fruits/apples');
  let deleteDir = await FileDirectory.delete('foods/fruits/apples');
  console.log('--- delete---', JSON.stringify(deleteDir, null, 2))



  await FileDirectory.create('grains/squash');
  await FileDirectory.move('grains/squash', 'vegetables');
  await FileDirectory.create('foods');
  await FileDirectory.move('grains', 'foods');
  await FileDirectory.move('fruits', 'foods');
  let move = await FileDirectory.move('vegetables', 'foods');
  console.log('--- move---', JSON.stringify(move, null, 2))
}
main()