import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView} from 'react-native'; 
import Swiper from 'react-native-swiper/src';

var {width} = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    useEffect(() => {
        setBannerData(['https://image.freepik.com/free-vector/modern-big-sale-yellow-banner-design_1017-15063.jpg',
        'https://cdn1.vectorstock.com/i/1000x1000/35/05/shopping-fashion-clothes-shop-boutique-banner-vector-15003505.jpg',
    'https://trendthoitrang.com/wp-content/uploads/2020/11/slider.jpg', 'https://gezo.vn/wp-content/uploads/2016/10/BANNER-CHINH-3-1170X600PX.jpg'])

        return () => {
            setBannerData([])
        }
    },[])


    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{height: width/2}}
                        autoplay={true}
                        showButtons={false}
                        autoplayTimeout={2}
                    >
                    {bannerData.map((item) => {
                        return(
                            <Image
                                key={item}
                                style={styles.image}
                                resizeMode="contain"
                                source={{uri: item}}
                            />
                        )
                    })}
                    </Swiper>

                    <View style={{height: 20}}></View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        width: width-40,
        height: width/2,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;