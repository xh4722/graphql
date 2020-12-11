/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

const { GraphQLDefinitionsFactory } = require('@nestjs/graphql')
const { join } = require('path')

const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  outputAs: 'class',
  path: join(process.cwd(), 'src/graphql.ts'),
  typePaths: ['./src/**/*.graphql'],
  watch: true,
})
