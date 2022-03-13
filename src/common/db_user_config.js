export default {
    dbName: "db_table10",                          // *数据库名称
    version: 1,                                 // 数据库版本号（默认为当前时间戳）
    tables: [                                   // *数据库的表，即ObjectStore
        {
            tableName: "user",                 // *表名
            option: { autoIncrement: true },          // 表配置，即ObjectStore配置，此处指明主键为id
            indexs: [                           // 数据库索引（建议加上索引）
                {
                    key: "nickname"
                },
                {
                    key: "time"
                }
            ]
        },
    ]
};