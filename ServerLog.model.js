const { DataTypes} = require('sequelize');
module.exports={
  name:'ServerLog',
  config:{
    // Specify the table name explicitly
    tableName: 'serverlog',
    // timestamps: false
  },
  attributes:{
    app_env: {
      type: DataTypes.STRING,
    },
    app_name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    req_method: {
      type: DataTypes.STRING,
    },
    req_url: {
      type: DataTypes.TEXT,
    },
    req_protocol: {
      type: DataTypes.STRING,
    },
    req_host: {
      type: DataTypes.STRING,
    },
    req_ip: {
      type: DataTypes.STRING,
    },
    req_body: {
      type: DataTypes.JSON,
      defaultsTo:{},
    },
    req_query: {
      type: DataTypes.JSON,
      defaultsTo:{},
    },
    req_headers: {
      type: DataTypes.JSON,
      defaultsTo:{}
    },
    req_route_path: {
      type: DataTypes.STRING,
      allowNull:true
    },
    req_user_id: {
      type: DataTypes.STRING,
      allowNull:true
    },
    req_org_id: {
      type: DataTypes.STRING,
      allowNull:true
    },
    req_session_id: {
      type: DataTypes.STRING,
    },
    res_status_code: {
      type: DataTypes.STRING,
      allowNull:true
    },
    res_status_message: {
      type: DataTypes.STRING,
      allowNull:true
    },
    res_time: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    res_meta: {
      type: DataTypes.JSON,
      defaultsTo:{},
    },
  },
}