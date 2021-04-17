import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text, Item } from 'native-base';

const CategoryFilter = (props) => {
    return(
        <ScrollView
            bounces 
            horizontal
            style={{ backgroundColor: '#f2f2f2', marginTop: 20, height: 70}}
        >
            <ListItem
                style={{ margin: 0, padding: 0, borderRadius: 0}}
            >
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActivate(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, {margin: 5},
                            props.activate == -1? styles.activate: styles.inactivate
                        ]}
                    >
                        <Text style={{color: 'white'}}>All</Text>
                    </Badge>
                </TouchableOpacity>
            </ListItem>

            {props.categories.map((item)=> (
                <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                        props.categoryFilter(item._id), 
                        props.setActivate(props.categories.indexOf(item))
                    }}
                >
                    <Badge
                        style={[styles.center, {margin: 5, marginTop: 20},
                            props.activate == props.categories.indexOf(item)? styles.activate: styles.inactivate
                        ]}
                    >
                        <Text style={{color: 'white'}}>{item.name}</Text>
                    </Badge>
            </TouchableOpacity>
            ))}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    activate: {
        backgroundColor: '#03bafc'
    },
    inactivate: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;