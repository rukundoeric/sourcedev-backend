# Create User model
# npx sequelize-cli model:generate --name User --attributes userId:uuid,firstName:string,lastName:string,email:string,password:string,role:string,image:string
#npx sequelize-cli model:generate --name Tokens --attributes userId:string,token:string
#sequelize migration:create --name add_blocked_column
# Run migration
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all