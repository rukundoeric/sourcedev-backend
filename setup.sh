
PGPORT=5432
PGHOST="localhost"
PGUSER="postgres"
DEV_PGDB="dev_sourcedev"
TEST_PGDB="test_sourcedev"
Template="template0"
createdb -h $PGHOST -T $Template   -p $PGPORT -U $PGUSER $DEV_PGDB
createdb -h $PGHOST -T $Template   -p $PGPORT -U $PGUSER $TEST_PGDB
touch .env
cat >> .env << EOF
DEV_DATABASE_URL=postgres:postgres@localhost:5432/dev_sourcedev
TEST_DATABASE_URL=postgres:postgres@localhost:5432/test_sourcedev
EOF
touch .env.example
cat >> .env.example << EOF
DEV_DATABASE_URL=
TEST_DATABASE_URL=
EOF
yarn install