import React from 'react';
import { View , StyleSheet, Text, Platform} from 'react-native';
import { LinearGradient } from 'expo';


class TitleSection extends React.Component {
  render() {
    return (
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 1}}>
            <Text style={styles.title}>
                {this.props.title}
            </Text>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    title: {
      textAlignVertical: 'center',
      flex: 1, 
      fontSize: 25, 
      textAlign: 'center',
      color: 'white'
    }
  });

export default TitleSection;