import {ActivityIndicator, SectionList, View} from 'react-native';
import React, {Component} from "react";
import {height} from "./helper/Screen";
import {EMPTY, ERROR, isNull, LOAD_MORE_EMPTY, LOADING, NORMAL, SUCCESS} from "./helper/StringUtils";
import XText from "./XText";
import XTextButton from "./XTextButton";
import PropTypes from "prop-types";
import {x10, x18} from "./helper/Dimens";

// beta
export default class XSectionList extends Component {
    static propTypes = {
        style: PropTypes.any,
        showsVerticalScrollIndicator: PropTypes.bool,
        ItemSeparatorComponent: PropTypes.any,
        ListFooterComponent: PropTypes.any,
        ListHeaderComponent: PropTypes.any,
        ListEmptyComponent: PropTypes.any,
        SectionSeparatorComponent: PropTypes.any,
        renderSectionHeader: PropTypes.func,
        inverted: PropTypes.bool,
        sections: PropTypes.array.isRequired,
        extraData: PropTypes.any,
        initialNumToRender: PropTypes.number,
        keyExtractor: PropTypes.func.isRequired,
        renderItem: PropTypes.func.isRequired,
        refreshing: PropTypes.bool,
        onRefresh: PropTypes.func,
        onLoadMore: PropTypes.func,

        emptyPress: PropTypes.func,
        emptyHeight: PropTypes.number,
        emptyText: PropTypes.string,
        emptyIcon: PropTypes.any,
        emptyStatus: PropTypes.string,

        loadMoreStatus: PropTypes.string,
        loadMorePress: PropTypes.func,
        loadMoreStyle: PropTypes.any,
        loadMoreColor: PropTypes.string,
    };

    static defaultProps = {
        showsVerticalScrollIndicator: true,
        emptyHeight: height,
        emptyText: '暂无数据',
        emptyIcon: require('./ximage/icon_net_empty.png'),
        emptyStatus: NORMAL,

        loadMoreStatus: NORMAL,

        loadMoreStyle: {
            textAlign: 'center',
            fontSize: x18,
            padding: x10,
        },
        loadMoreColor: 'gray',
    };

    render() {
        const {
            style,
            showsVerticalScrollIndicator,
            ItemSeparatorComponent,
            ListFooterComponent,
            ListHeaderComponent,
            ListEmptyComponent,
            SectionSeparatorComponent,
            renderSectionHeader,
            inverted,
            sections,
            extraData,
            initialNumToRender,
            keyExtractor,
            renderItem,
            refreshing,
            onRefresh,
            onLoadMore,
            emptyStatus,
            loadMoreStatus,
            loadMorePress,
        } = this.props;
        return (
            <SectionList
                style={style}
                sections={sections}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                SectionSeparatorComponent={() => {
                    return SectionSeparatorComponent || null;
                }}
                ItemSeparatorComponent={() => {
                    return ItemSeparatorComponent || null;
                }}
                ListHeaderComponent={ListHeaderComponent}
                inverted={inverted}
                renderSectionHeader={({section}) => renderSectionHeader(section)}
                ListFooterComponent={isNull(ListFooterComponent) ? this.getLoadMoreView(loadMoreStatus, loadMorePress) : ListFooterComponent}
                ListEmptyComponent={isNull(ListEmptyComponent) ? this.getEmptyView(emptyStatus) : ListEmptyComponent}
                extraData={extraData}
                initialNumToRender={initialNumToRender}
                keyExtractor={(item, index) => keyExtractor(item, index)}
                renderItem={(item) => renderItem(item)}
                onEndReachedThreshold={0.1}
                onEndReached={onLoadMore}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        )
    }

    getEmptyView = (emptyStatus) => {
        switch (emptyStatus) {
            case EMPTY:
                return <View style={{height: this.props.emptyHeight, alignItems: 'center', justifyContent: 'center'}}>
                    <XTextButton imageOption={'bottom'}
                                 text={this.props.emptyText}
                                 icon={this.props.emptyIcon}
                                 textStyle={{textAlign: 'center'}}
                                 onPress={this.props.emptyPress}/>
                </View>;
            case ERROR:
                return <View style={{height: this.props.emptyHeight, alignItems: 'center', justifyContent: 'center'}}>
                    <XTextButton imageOption={'bottom'}
                                 text={this.props.emptyText}
                                 icon={this.props.emptyIcon}
                                 textStyle={{textAlign: 'center'}}
                                 onPress={this.props.emptyPress}/>
                </View>;
            default:
                return <View style={{height: this.props.emptyHeight, alignItems: 'center', justifyContent: 'center'}}/>
        }
    };

    getLoadMoreView = (loadMoreState, loadMorePress) => {
        switch (loadMoreState) {
            case LOADING:
                return <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <ActivityIndicator
                        animating={true}
                        color={this.props.loadMoreColor}
                        size="large"
                    />
                    <XText textStyle={this.props.loadMoreStyle} text={'正在加载...'}/>
                </View>;
            case ERROR:
                return <XText textStyle={this.props.loadMoreStyle} text={'加载错误,请点击重试'} onPress={loadMorePress}/>;
            case LOAD_MORE_EMPTY:
                return <XText textStyle={this.props.loadMoreStyle} text={'没有更多数据了'}/>;
            case SUCCESS:
                return <XText textStyle={this.props.loadMoreStyle} text={'加载成功'}/>;
            default:
                return null;
        }
    };
}

