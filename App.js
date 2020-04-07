import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Picker} from 'react-native';
import moment from 'moment';

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      selectedValue:"",
      data:[],
      names:[]
    }
    this.getNameList=this.getNameList.bind(this)
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData=async()=>{
    const response = await fetch('http://socialnet.mooo.com/eu.php')
    let json = await response.json()
    this.setState({
      data:json.results.sort((a,b)=>moment(b.course_last_accessed_date)-moment(a.course_last_accessed_date)),
      names:json.results.map(obj=>obj.user_name+" "+obj.user_surname).sort().filter((a,b,self)=>{ return self.indexOf(a)==b})
    })
  }
  getNameList(){
    let pickerItem=[];
    for(var i=0;i<this.state.names.length;i++){
      pickerItem.push(<Picker.Item label={this.state.names[i]} value={this.state.names[i]} />)
    }
    return pickerItem
  }
  
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.colorWhite}> Welcome UdemyBusiness tracking App!</Text>
        </View>

        <View style={styles.body}>
          <View style={{alignSelf:"stretch", flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Picker
            selectedValue={this.state.selectedValue}
            style={{ height: 30, width:"80%" }}
            onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}
          >
            <Picker.Item label="Select Name" value="" />
            {this.getNameList()}
            </Picker>
          </View>
          <View style={{flex:13}}>
            <FlatList
            data={this.state.data.filter(a=>a.user_name+" "+a.user_surname===this.state.selectedValue)}
              keyExtractor={(x , i )=>i}
              renderItem={({item}) =>
              <View style={styles.row}>
                <View style={{backgroundColor:"#004060"}}>
                  <Text style={styles.colorWhite}>Name: </Text>
                  <Text style={styles.colorWhite}>Course Title: </Text>
                  <Text style={styles.colorWhite}>Course Duration: </Text>
                  <Text style={styles.colorWhite}>Consumed Hour: </Text>
                  <Text style={styles.colorWhite}>Complation Ratio: </Text>
                  <Text style={styles.colorWhite}>Start date: </Text>
                  <Text style={styles.colorWhite}>Complation Date: </Text>
                  <Text style={styles.colorWhite}>Last Access Date: </Text>
                  <Text/>
                  <Text/>
                </View>
                <View>
                  <Text style={styles.colorWhite}> {item.user_name} {item.user_surname}</Text>
                  <Text style={styles.titles}> {item.course_title}</Text>
                  <Text style={styles.colorWhite}> {(item.course_duration/60).toFixed(2)} h</Text>
                  <Text style={styles.colorWhite}> {(item.num_video_consumed_minutes/60).toFixed(2)} h</Text>
                  <Text style={styles.colorWhite}> % {item.completion_ratio}</Text>
                  <Text style={styles.colorWhite}> {moment(item.course_start_date).format("l")}</Text>
                  <Text style={styles.colorWhite}> {moment(item.course_completion_date).format("l")!="Invalid date"||""}</Text>
                  <Text style={styles.colorWhite}> {moment(item.course_last_accessed_date).format("l")}</Text>
                </View>

              </View>}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.colorWhite}>This is test app.</Text>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    flex: 1,
    backgroundColor: 'red'
  },
  header:{
    paddingTop:10,
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#002040"
  },
  body:{
    backgroundColor:'steelblue',
    justifyContent:"center",
    alignItems:"center",
    flex:16
  },
  footer:{
    flex:1,
    flexDirection:"column-reverse",
    backgroundColor:"#002030"
  },
  row:{
    flex:1,
    flexDirection:"row"
  },
  colorWhite:{
    color:"white"
  },
  textInput:{
    paddingLeft:10,
    padding:2,
    backgroundColor:"whitesmoke", 
    marginRight:20,
    marginLeft:20,
    width:"50%",
    borderColor:"#282856",
    borderWidth:3,
    borderRadius:1
  },
  titles:{
    color:"white"
  }
});
