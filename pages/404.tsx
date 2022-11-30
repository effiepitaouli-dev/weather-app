export default function Custom404() {
    const styles = {
        textAlign: "center",
        fontSize: "4rem"
    }
    return (
        <>
            <div className="page-404">
                <h4>Hey now! You seem to be lost</h4>
                {/* 
                    <style jsx>
                        {`
                            .page-404 div {
                                text-align: center;
                                font-size: 4rem;
                            }
                        `}
                    </style> 
                */}
                <div style={styles}> 404</div>
                <div>Animated SVG?</div>
            </div>
        </>
    )
}